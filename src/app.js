import readline from 'node:readline';
import * as authService from './services/auth_service.js';
import * as catalogService from './services/catalog_service.js';
import * as cartService from './services/cart_service.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

/**
 * Handles the user login flow, asking for credentials until successful.
 * @returns {Promise<User|null>} The authenticated user object, or null if login fails.
 */
async function handleLogin() {
    console.log("\n🛍️  Welcome to Shopee! 🛍️");
    console.log("Please log in to continue.");

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`\n--- Attempt ${attempt} of ${maxAttempts} ---`);
        const email = await question("Enter your email: ");
        const password = await question("Enter your password: ");
        const user = await authService.login(email, password);

        if (user) {
            return user; // Success, return the user object
        }
    }

    return null; // Failed all attempts
}

/**
 * Handles the flow for adding an item to the cart.
 * @param {Array} currentCart The user's current cart.
 * @returns {Promise<Array>} The updated cart.
 */
async function handleAddItem(currentCart) {
    // Show catalog once, initially

    const itemIdStr = await question("\nEnter the Number of the item to add: ");
    // The 'question' function returns a string. We use parseInt to convert it into a
    // number so we can use it for lookups and comparisons. The '10' is the radix,
    // ensuring the string is parsed as a standard base-10 decimal number.
    const itemId = parseInt(itemIdStr, 10);

    // Input validation for ID
    if (isNaN(itemId)) {
        console.log("\n❌ Invalid Choice. Please enter a number on the List.");
        return currentCart;
    }

    const item = await catalogService.getItemById(itemId); // Use catalogService to find the item
    if (!item) {
        console.log("\n❌ Item not found!");
        return currentCart;
    }

    // This function adds only one unit of the item at a time.
    const updatedCart = await cartService.addItem(currentCart, item);
    // Provide feedback to the user.
    console.log(`\n✅ Added 1x "${item.name}" to your cart.`);
    return updatedCart;
}

/**
 * Handles the flow for filtering the catalog by category.
 */
async function handleFilterByCategory() {
    console.log("\n--- Filter Products by Category ---");
    await catalogService.displayCategories(); // Show available categories
    console.log("Enter '0' to clear filter and show all products.");

    const categoryIdStr = await question("Enter the category Number to filter by: ");

    const categoryId = parseInt(categoryIdStr, 10);

    if (isNaN(categoryId)) {
        console.log("\n❌ Invalid input. Please enter a number.");
        return; // Exit the function
    }

    if (categoryId === 0) {
        console.log("\nClearing filter...");
        await catalogService.displayCatalog(); // Show all products
    } else {
        // displayCatalog handles cases where the category ID might not exist.
        await catalogService.displayCatalog(categoryId);
    }
}

/**
 * A helper function to prompt the user to select an item from their cart.
 * It handles displaying the cart and validating the user's choice.
 * @param {Array} currentCart The user's current cart.
 * @param {string} promptMessage The message to show the user.
 * @returns {Promise<Object|null>} The selected item object, or null if invalid.
 */
async function promptAndFindItemInCart(currentCart, promptMessage) {
    if (currentCart.length === 0) {
        console.log("\n🛒 Your cart is empty.");
        return null;
    }

    await cartService.displayCartDetails("Your", currentCart);

    const itemIdStr = await question(promptMessage);
    const itemId = parseInt(itemIdStr, 10);

    if (isNaN(itemId)) {
        console.log("\n❌ Invalid Choice. Please enter a number.");
        return null;
    }

    const itemInCart = currentCart.find(i => i.id === itemId);
    if (!itemInCart) {
        console.log("\n❌ Item not found in your cart.");
        return null;
    }
    return itemInCart;
}

/**
 * Handles the flow for removing one unit of an item from the cart.
 * @param {Array} currentCart The user's current cart.
 * @returns {Promise<Array>} The updated cart.
 */
async function handleRemoveItem(currentCart) {
    console.log("\n--- Remove 1 unit of an Item ---");
    const itemToRemove = await promptAndFindItemInCart(currentCart, "Enter the Number of the item to remove 1 unit from: ");

    if (!itemToRemove) {
        return currentCart;
    }

    const updatedCart = await cartService.removeItem(currentCart, itemToRemove);
    console.log(`\n✅ Removed 1x "${itemToRemove.name}" from your cart.`);
    return updatedCart;
}

/**
 * Handles the flow for deleting an item completely from the cart.
 * @param {Array} currentCart The user's current cart.
 * @returns {Promise<Array>} The updated cart.
 */
async function handleDeleteItem(currentCart) {
    console.log("\n--- Delete Item from Cart ---");
    const itemToDelete = await promptAndFindItemInCart(currentCart, "Enter the Number of the item to delete completely: ");

    if (!itemToDelete) {
        return currentCart;
    }

    const updatedCart = await cartService.deleteItem(currentCart, itemToDelete);
    console.log(`\n🗑️ Deleted all units of "${itemToDelete.name}" from your cart.`);
    return updatedCart;
}

/**
 * Handles the checkout process.
 * @param {User} user The logged-in user.
 * @param {Array} userCart The user's cart.
 * @returns {Promise<boolean>} True if checkout was successful, otherwise false.
 */
async function handleCheckout(user, userCart) {
    if (userCart.length === 0) {
        console.log("\n🛒 Your cart is empty. Add some items before checking out.");
        return false; // Checkout did not complete
    }

    // Display the cart one last time for confirmation
    await cartService.displayCartDetails(user.name, userCart);
    console.log("\n--- Confirm Checkout ---");
    console.log("1. Yes, proceed to checkout");
    console.log("2. No, continue shopping");
    const choice = await question("Choose an option: ");

    // Only proceed if the user explicitly confirms with '1'.
    // Any other input will cancel the checkout process.
    if (choice !== '1') {
        console.log("\nCheckout cancelled. You can continue shopping.");
        return false; // User cancelled checkout, return to main menu
    }

    // The checkout message is now in English and more professional.
    console.log(`\n✅ The payment link has been sent to your registered email: ${user.email}.`);
    console.log("Please check your inbox to complete the payment and await further instructions.");
    console.log("Thank you for shopping with us! Come back again! =)");
    return true; // Checkout is considered successful and will end the session.
}

/**
 * Displays the main menu and handles user navigation.
 * @param {User} user The currently logged-in user.
 */
async function mainMenu(user) {
    let userCart = [];
    let running = true;
    let invalidAttempts = 0;
    const maxInvalidAttempts = 3;

    while (running) {
        console.log("\n--- Main Menu ---");
        console.log("1. View All Products");
        console.log("2. Filter by Category");
        console.log("3. Add Item to Cart"); // Add 1 unit
        console.log("4. Remove 1 unit from Item");
        console.log("5. Delete Item from Cart");
        console.log("6. View Cart");
        console.log("7. Checkout");
        console.log("8. Log Out");

        const choice = await question("Choose an option: ");

        // We create a "flag" that assumes the user's choice will be valid.
        // This allows us to centralize the logic for handling invalid attempts later on.
        let validChoice = true;
        switch (choice) {
            case '1':
                await catalogService.displayCatalog();
                break;
            case '2':
                await handleFilterByCategory();
                break;
            case '3':
                // The cart is updated with the result of the handleAddItem function
                userCart = await handleAddItem(userCart);
                break;
            case '4':
                userCart = await handleRemoveItem(userCart);
                break;
            case '5':
                userCart = await handleDeleteItem(userCart);
                break;
            case '6':
                await cartService.displayCartDetails(user.name, userCart);
                break;
            case '7':
                const checkoutCompleted = await handleCheckout(user, userCart);
                if (checkoutCompleted) {
                    running = false; // End the session after successful checkout
                }
                break;
            case '8':
                running = false;
                break;
            default:
                // This is the turning point: if the choice is invalid, we "lower the flag"
                // to false. This is the only place this flag is modified.
                validChoice = false;
                invalidAttempts++;
                if (invalidAttempts >= maxInvalidAttempts) {
                    console.log("\nToo many invalid attempts. Forcing logout for security.");
                    running = false;
                } else {
                    const attemptsLeft = maxInvalidAttempts - invalidAttempts;
                    console.log(`\nInvalid option. Please try again. You have ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`);
                }
        }

        // After the switch, we check the flag's final state. If it's still true,
        // it means a valid action was performed, so we reset the invalid attempt counter.
        if (validChoice) {
            invalidAttempts = 0;
        }
    }
}

async function startApp() {
    const user = await handleLogin();

    if (!user) {
        console.log("\nMaximum login attempts reached. Logging out.");
        console.log("Come back again! =)");
        rl.close();
        return;
    }

    console.log(`\n👋 Welcome, ${user.name}!`);

    // Display the catalog once, right after login
    await catalogService.displayCatalog();

    await mainMenu(user);

    console.log("\nThank you for shopping with us. Come back again! =)");
    rl.close();
}

export { startApp };

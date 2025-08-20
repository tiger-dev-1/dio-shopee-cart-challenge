import readline from 'node:readline';
import * as authService from './services/auth_service.js';
import * as catalogService from './services/catalog_service.js';
import * as cartService from './services/cart_service.js';
import { mockDatabase } from './database.js';

// Helper to use modern async/await with readline
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
        console.log("3. Add Item to Cart");
        console.log("4. View Cart");
        console.log("5. Log Out");

        const choice = await question("Choose an option: ");

        switch (choice) {
            case '1':
                await catalogService.displayCatalog();
                invalidAttempts = 0; // Reset on valid choice
                break;
            case '2':
                await handleFilterByCategory();
                invalidAttempts = 0;
                break;
            case '3':
                // The cart is updated with the result of the handleAddItem function
                userCart = await handleAddItem(userCart);
                invalidAttempts = 0;
                break;
            case '4':
                await cartService.displayCartDetails(user.name, userCart);
                invalidAttempts = 0; // Reset on valid choice
                break;
            case '5':
                running = false;
                break;
            default:
                invalidAttempts++;
                if (invalidAttempts >= maxInvalidAttempts) {
                    console.log("\nToo many invalid attempts. Forcing logout for security.");
                    running = false;
                } else {
                    const attemptsLeft = maxInvalidAttempts - invalidAttempts;
                    console.log(`\nInvalid option. Please try again. You have ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`);
                }
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

import readline from 'node:readline';
import * as authService from './services/auth_service.js';
import * as catalogService from './services/catalog_service.js';
import * as cartService from './services/cart_service.js';

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
        console.log("1. View Products");
        console.log("2. View Cart");
        console.log("3. Add Item to Cart");
        console.log("4. Log Out");

        const choice = await question("Choose an option: ");

        switch (choice) {
            case '1':
                await catalogService.displayCatalog();
                invalidAttempts = 0; // Reset on valid choice
                break;
            case '2':
                console.log("\n[TODO: Implement View Cart]");
                invalidAttempts = 0; // Reset on valid choice
                break;
            case '3':
                console.log("\n[TODO: Implement Add Item]");
                invalidAttempts = 0; // Reset on valid choice
                break;
            case '4':
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
        console.log("Come back soon! =)");
        rl.close();
        return;
    }

    console.log(`\n👋 Welcome, ${user.name}!`);
    await mainMenu(user);

    console.log("\nThank you for shopping with us. Come back again! =)");
    rl.close();
}

export { startApp };

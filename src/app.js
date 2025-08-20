import readline from 'node:readline';
import * as authService from './services/auth_service.js';

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

async function startApp() {
    const user = await handleLogin();

    if (!user) {
        console.log("\nMaximum login attempts reached. Exiting application.");
        console.log("Come back soon! =)");
        rl.close();
        return;
    }

    console.log(`\n👋 Welcome, ${user.name}!`);
    console.log("Application main menu will be here. Exiting for now.");
    rl.close();
}

export { startApp };

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
 * @returns {Promise<User>} The authenticated user object.
 */
async function handleLogin() {
    console.log("\n🛍️  Welcome to Shopee! 🛍️");
    console.log("Please log in to continue.");

    let user = null;
    while (!user) {
        const email = await question("Enter your email: ");
        const password = await question("Enter your password: ");
        user = await authService.login(email, password);
    }
    return user;
}

async function startApp() {
    const user = await handleLogin();
    console.log(`\n👋 Welcome, ${user.name}!`);
    console.log("Application main menu will be here. Exiting for now.");
    rl.close();
}

export { startApp };

import { mockUsers } from "../database.js";

/**
 * Simulates a user login.
 * In a real application, this would involve password hashing and database lookups.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<User|null>} The logged-in User object, or null if credentials are invalid.
 */
async function login(email, password) {
    console.log(`\nAttempting to log in as ${email}...`);

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
        console.log(`✅ Login successful!`);
        return user;
    }

    console.log("❌ Invalid email or password.");
    return null;
}

export { login };
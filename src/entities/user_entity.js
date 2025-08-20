/**
 * Represents a User entity.
 */
export default class User {
    constructor(id, name, email, password) {
        // Validation guards to ensure data integrity upon creation.
        if (typeof id !== 'number' || id <= 0) {
            throw new Error("User 'id' must be a positive number.");
        }
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error("User 'name' must be a non-empty string.");
        }
        // Basic email format check
        if (typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
            throw new Error("User 'email' must be a valid email address.");
        }
        if (typeof password !== 'string' || password.length < 6) {
            throw new Error("User 'password' must be at least 6 characters long.");
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
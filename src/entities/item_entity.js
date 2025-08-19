/**
 * Represents an Item entity in the store.
 */
export default class Item {
    /**
     * Creates an instance of an Item.
     * The constructor acts as a gateway, validating all data upon creation.
     * @param {number} id - The unique identifier, must be a positive number.
     * @param {string} name - The item's name, must be a non-empty string.
     * @param {string} description - The item's description.
     * @param {number} price - The item's price, must be a positive number.
     * @param {number} stock - The available stock, must be a non-negative number.
     * @param {string} category - The item's category, must be a non-empty string.
     */
    constructor(id, name, description, price, stock, category) {
        // --- Runtime Validation Guards ---
        // The following checks are performed at runtime every time a new Item is created.
        // If any condition is not met, an error is thrown, which halts the object's creation and terminates the program execution.
        // This guarantees that any existing Item instance in the system is valid.
        // The OR (||) operator ensures the validation fails if EITHER the type is not a number OR the value is not positive.
        if (typeof id !== 'number' || id <= 0) {
            throw new Error("Item 'id' must be a positive number.");
        }
        // The trim() method removes whitespace from both ends of a string.
        // This ensures that a name consisting only of spaces is considered invalid.
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error("Item 'name' must be a non-empty string.");
        }
        if (typeof description !== 'string') {
            throw new Error("Item 'description' must be a string.");
        }
        if (typeof price !== 'number' || price <= 0) {
            throw new Error("Item 'price' must be a positive number.");
        }
        if (typeof stock !== 'number' || stock < 0) {
            throw new Error("Item 'stock' must be a non-negative number.");
        }
        if (typeof category !== 'string' || category.trim().length === 0) {
            throw new Error("Item 'category' must be a non-empty string.");
        }

        // If all validations pass, the properties are assigned to the new object.
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}

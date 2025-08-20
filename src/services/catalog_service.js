import { mockDatabase, mockCategories } from "../database.js";

/**
 * Displays all available items from the database in a user-friendly format.
 * Can be filtered by category.
 * @param {number} [categoryId] - Optional. The ID of the category to filter the catalog by.
 */
async function displayCatalog(categoryId) {
    let itemsToDisplay = mockDatabase;
    let header = "📜 Full Product Catalog 📜";

    if (categoryId) {
        const category = mockCategories.find(c => c.id === categoryId);
        if (category) {
            header = `📜 Catalog | Filter: ${category.name} 📜`;
            itemsToDisplay = mockDatabase.filter(item => item.category === category.name);
        }
    }

    console.log(`\n--- ${header} ---`);

    itemsToDisplay.forEach((item, index) => {
        const stockInfo = item.stock > 0
            ? `R$${item.price.toFixed(2)}`
            : "(Out of Stock)";
        // 1. The "ID:" text is removed for a cleaner look.
        // 2. A tab character (\t) is used to create more space and align the text.
        console.log(`[${item.id}]\t${item.name} - ${stockInfo}`);

        // 3. Add a separator line between items for better readability, but not after the last one.
        if (index < itemsToDisplay.length - 1) {
            console.log("  - - - - - - - - - - - - - - - - - - - - - - -");
        }
    });
    console.log("---------------------------------------------------------------------------------\n");
}

/**
 * Displays all available categories for the user to see.
 */
async function displayCategories() {
    console.log("\n--- 🗂️ Available Categories 🗂️ ---");
    mockCategories.forEach(category => {
        console.log(`[${category.id}] ${category.name}`);
    });
    console.log("----------------------------------\n");
}


export { displayCatalog, displayCategories };

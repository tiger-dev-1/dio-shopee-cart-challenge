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

    itemsToDisplay.forEach(item => {
        // Display all items, but add a special note for those out of stock.
        const stockInfo = item.stock > 0
            ? `R$${item.price.toFixed(2)}`
            : "(Out of Stock)";
        console.log(`[ID: ${item.id}] ${item.name} - ${stockInfo}`);
    });
    console.log("------------------------------------------------------\n");
}

export { displayCatalog };

import mockDatabase from "../database.js";

/**
 * Displays all available items from the database in a user-friendly format.
 * It now shows all items, indicating which ones are out of stock.
 */
async function displayCatalog() {
    console.log("\n--- 📜 Product Catalog 📜 ---");
    mockDatabase.forEach(item => {
        // Display all items, but add a special note for those out of stock.
        const stockInfo = item.stock > 0
            ? `R$${item.price.toFixed(2)}`
            : "(Out of Stock)";
        console.log(`[ID: ${item.id}] ${item.name} - ${stockInfo}`);
    });
    console.log("-----------------------------\n");
}

export { displayCatalog };

import * as cartService from "../services/cart_service.js";
import * as catalogService from "../services/catalog_service.js";
import { mockDatabase } from "../database.js";
import User from "../entities/user_entity.js";

async function main() {
    // Create a sample user to make the simulation more personal
    const myUser = new User(1, "Jane Doe", "jane.doe@example.com", "password123");
    console.log(`\n👋 Welcome, ${myUser.name}!`);

    // Show the user the available categories first
    await catalogService.displayCategories();

    // Then, display the full product catalog to the user
    await catalogService.displayCatalog();

    // Then, display a filtered catalog
    await catalogService.displayCatalog(2); // Filter by category ID for "Electronics"

    console.log(`🛍️  Let's start shopping! 🛍️\n`);
    // The user's cart starts empty
    let userCart = [];

    // Let's pick some items from the database to add
    // Using find() is more robust than using array indices, as it's not affected by the order of items.
    const itemRedmi = mockDatabase.find(item => item.id === 6); // Redmi Note 14 Pro+
    const itemChess = mockDatabase.find(item => item.id === 15); // Crystal Chess Set
    const itemLegion = mockDatabase.find(item => item.id === 8); // Lenovo Legion 5i Gaming Notebook (stock: 8)
    const itemOutOfStock = mockDatabase.find(item => item.id === 5); // Polo T-Shirt (0 stock)

    // --- Add items to the cart ---
    console.log("🛒 Adding 2x Redmi Note 14 Pro+...");
    userCart = await cartService.addItem(userCart, itemRedmi);
    userCart = await cartService.addItem(userCart, itemRedmi);

    console.log("\n🛒 Adding 1x Crystal Chess Set...");
    userCart = await cartService.addItem(userCart, itemChess);

    // --- Test stock limit for an existing item ---
    console.log(`\n🛒 Attempting to add ${itemLegion.stock + 1}x ${itemLegion.name}...`);
    for (let i = 0; i < itemLegion.stock + 1; i++) {
        userCart = await cartService.addItem(userCart, itemLegion);
    }

    // --- Test adding an item that is out of stock ---
    console.log(`\n🛒 Attempting to add "${itemOutOfStock.name}"...`);
    userCart = await cartService.addItem(userCart, itemOutOfStock);

    // --- Remove an item (decrement quantity) ---
    console.log("\n🛒 Removing 1x Redmi Note 14 Pro+...");
    userCart = await cartService.removeItem(userCart, itemRedmi);

    // --- Delete an item (remove completely) ---
    console.log(`\n🗑️ Deleting ${itemLegion.name} from the cart...`);
    userCart = await cartService.deleteItem(userCart, itemLegion);

    // --- Display final cart details ---
    await cartService.displayCartDetails(myUser.name, userCart);
}

main();
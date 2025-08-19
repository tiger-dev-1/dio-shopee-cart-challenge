import * as cartService from "../services/cart_service.js";
import mockDatabase from "../database.js";
import User from "../entities/user_entity.js";

async function main() {
    // Create a sample user to make the simulation more personal
    const myUser = new User(1, "Jane Doe", "jane.doe@example.com", "password123");
    console.log(`🛍️  Welcome to the Shopee Cart, ${myUser.name}! 🛍️\n`);

    // The user's cart starts empty
    let userCart = [];

    // Let's pick some items from the database to add
    // Using find() is more robust than using array indices, as it's not affected by the order of items.
    const item1 = mockDatabase.find(item => item.id === 4); // Redmi Note 14 Pro+
    const item3 = mockDatabase.find(item => item.id === 11); // Crystal Chess Set
    const legion = mockDatabase.find(item => item.id === 6); // Lenovo Legion 5i Gaming Notebook (stock: 8)
    const outOfStockItem = mockDatabase.find(item => item.id === 17); // Item with 0 stock

    // --- Add items to the cart ---
    console.log("🛒 Adding 2x Redmi Note 14 Pro+...");
    userCart = await cartService.addItem(userCart, item1);
    userCart = await cartService.addItem(userCart, item1);

    console.log("\n🛒 Adding 1x Crystal Chess Set...");
    userCart = await cartService.addItem(userCart, item3);

    // --- Test stock limit for an existing item ---
    console.log(`\n🛒 Attempting to add ${legion.stock + 1}x ${legion.name}...`);
    for (let i = 0; i < legion.stock + 1; i++) {
        userCart = await cartService.addItem(userCart, legion);
    }

    // --- Test adding an item that is out of stock ---
    console.log(`\n🛒 Attempting to add "${outOfStockItem.name}"...`);
    userCart = await cartService.addItem(userCart, outOfStockItem);

    // --- Remove an item ---
    console.log("\n🛒 Removing 1x Redmi Note 14 Pro+...");
    userCart = await cartService.removeItem(userCart, item1);

    // --- Display final cart details ---
    await cartService.displayCartDetails(myUser.name, userCart);
}

main();
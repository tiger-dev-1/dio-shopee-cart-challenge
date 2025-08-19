/**
 * Adds an item to the user's cart.
 * If the item already exists, its quantity is incremented.
 *
 * @param {Array} userCart - The user's current cart.
 * @param {Object} item - The item to be added.
 * @returns {Array} The updated cart.
 */
async function addItem(userCart, item) {
    // Checks if the item is already in the cart using findIndex.
    // This method iterates through the array, similar to a forEach loop, but it stops
    // and returns the item's index as soon as the condition is met.
    // If the item is not found after checking all elements, it returns -1.
    const itemIndex = userCart.findIndex((cartItem) => cartItem.id === item.id);

    // Case 1: The item is already in the cart.
    if (itemIndex !== -1) {
        // We can only increment if the current quantity is less than the available stock.
        if (userCart[itemIndex].quantity < item.stock) {
            userCart[itemIndex].quantity++;
        } else {
            // Otherwise, inform the user that the stock limit has been reached.
            console.log(`\n❌ Sorry! Not enough stock for "${item.name}". You already have the maximum of ${item.stock} in your cart.`);
        }
        return userCart;
    }

    // Case 2: The item is NOT in the cart yet.
    // We can only add it if there is at least one unit in stock.
    if (item.stock > 0) {
        userCart.push({ ...item, quantity: 1 });
    } else {
        console.log(`\n❌ Sorry! "${item.name}" is currently out of stock and cannot be added.`);
    }

    return userCart;
}

/**
 * Removes one unit of an item from the cart.
 * If the quantity reaches zero, the item is removed from the cart.
 *
 * @param {Array} userCart - The user's current cart.
 * @param {Object} item - The item to be removed.
 * @returns {Array} The updated cart.
 */
async function removeItem(userCart, item) {
    const itemIndex = userCart.findIndex((cartItem) => cartItem.id === item.id);

    // Guard Clause: If the item is not found (findIndex returns -1),
    // log a message and return the cart without any changes.
    // This prevents runtime errors from trying to access an invalid array index.
    if (itemIndex === -1) {
        console.log("Item not found in cart.");
        return userCart;
    }

    if (userCart[itemIndex].quantity > 1) {
        userCart[itemIndex].quantity -= 1; //same as quantity = quantity - 1
    } else {
        // If the quantity is 1, the item should be completely removed from the cart.
        // The splice() method modifies the array in-place.
        // The first argument is the starting index.
        // The second argument (1) is the number of elements to remove. It's crucial here;
        // omitting it would remove all elements from the index to the end of the array.
        userCart.splice(itemIndex, 1);
    }

    return userCart;
}

/**
 * Calculates the total price of all items in the cart.
 *
 * @param {Array} userCart - The user's cart.
 * @returns {number} The total price.
 */
async function calculateTotal(userCart) {
    // The reduce method is used to "reduce" an array to a single value.
    // It executes a callback function for each element of the array.
    // 'acc' (accumulator) is the value accumulated so far. It starts at 0 (the second argument).
    // 'item' is the current element being processed in the array.
    // For each item, we calculate its subtotal (price * quantity) and add it to the accumulator.
    // The final result is the sum of all subtotals.
    const total = userCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total;
}

/**
 * Displays the details of the cart, including subtotal for each item and the grand total.
 *
 * @param {string} userName - The name of the user for a personalized message.
 * @param {Array} userCart - The user's cart.
 */
async function displayCartDetails(userName, userCart) {
    console.log(`\n--- ${userName}'s Cart Details ---`);
    if (userCart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }

    userCart.forEach(item => {
        const subtotal = item.price * item.quantity;
        console.log(`> ${item.name} (Qty: ${item.quantity}) - Subtotal: R$${subtotal.toFixed(2)}`);
    });

    const total = await calculateTotal(userCart);
    console.log(`\n--- Total: R$${total.toFixed(2)} ---`);
}

export {
    addItem,
    removeItem,
    calculateTotal,
    displayCartDetails,
};

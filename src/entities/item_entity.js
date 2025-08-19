/**
 * Represents an Item entity in the store.
 */
export default class Item {
    constructor(id, name, description, price, storageQty, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.storageQty = storageQty; // Quantity in storage
        this.category = category;
    }
}
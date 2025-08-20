import Item from "./entities/item_entity.js";
import User from "./entities/user_entity.js";

const mockDatabase = [
    // Apparel & Footwear
    new Item(1, "Adidas NBA Lakers Jersey - LeBron #23", "Official Lakers Swingman jersey, with LeBron James' name and number.", 399.99, 20, "Apparel & Footwear"),
    new Item(2, "10-Pack Mash Black Boxer Briefs", "Pack of 10 seamless 100% cotton Mash boxer briefs with a custom waistband.", 249.90, 50, "Apparel & Footwear"),
    new Item(3, "Rider Style Free Black Sandals", "Sandals with adjustable straps and anatomical sole for maximum comfort.", 129.90, 40, "Apparel & Footwear"),
    new Item(4, "Nike Air Zoom Pegasus 40 Running Shoes", "Running shoes with responsive Nike Air Zoom cushioning for daily training.", 899.99, 30, "Apparel & Footwear"),
    new Item(5, "Polo Wear Navy Blue T-Shirt", "A classic navy blue t-shirt from Polo Wear, made from 100% cotton for comfort and style.", 89.90, 0, "Apparel & Footwear"),

    // Electronics
    new Item(6, "Redmi Note 14 Pro+ 5G", "Flagship smartphone with a 200MP camera, 256GB storage, and a 120Hz AMOLED display.", 2899.00, 25, "Electronics"),
    new Item(7, "KZ ZS10 Pro X Earphones", "In-ear monitors with 1 dynamic & 4 balanced armature drivers for high-fidelity audio.", 249.90, 60, "Electronics"),
    new Item(8, "Lenovo Legion 5i Gaming Notebook", "Gaming notebook with Intel i7, NVIDIA RTX 4060, 16GB RAM, and 1TB SSD.", 8999.00, 8, "Electronics"),
    new Item(9, "Xiaomi Mi Band 9 Smartwatch", "Fitness tracker with heart rate monitoring, SpO2 sensor, and 150+ sport modes.", 329.99, 100, "Electronics"),

    // Home Appliances
    new Item(10, "Brastemp Frost Free Refrigerator", "Brastemp Frost Free Inverse 2-door Refrigerator with 443L capacity.", 3899.00, 12, "Home Appliances"),
    new Item(11, "Electrolux 18kg Black Washing Machine", "Top-load washing machine with Jet&Clean technology and silent motor.", 2799.00, 15, "Home Appliances"),
    new Item(12, "Philips Walita 8-in-1 Food Processor", "750W food processor with 8 functions, including blending, slicing, and shredding.", 399.90, 30, "Home Appliances"),
    new Item(13, "Fischer 5-Burner Gas Cooktop", "Tempered glass gas cooktop with 5 burners and automatic ignition.", 599.00, 25, "Home Appliances"),

    // Toys
    new Item(14, "Chrono Trigger - Nintendo DS Cartridge", "The classic time-traveling RPG, complete in box for the Nintendo DS.", 499.90, 15, "Toys"),
    new Item(15, "Dal Rossi Crystal Chess Set", "Luxury chess set with a wooden board and finely crafted crystal pieces.", 799.00, 10, "Toys"),
    new Item(16, "The Little Prince Coloring Book", "A coloring book featuring the beloved characters and scenes from the classic story.", 49.90, 100, "Toys"),
    new Item(17, "Copag 139 Professional Playing Cards", "A professional-grade deck, plastic-coated for durability and smooth handling.", 39.90, 200, "Toys"),
];

const mockCategories = [
    { id: 1, name: "Apparel & Footwear" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Home Appliances" },
    { id: 4, name: "Toys" },
];

const mockUsers = [
    new User(1, "Angela Yvonne Davis", "angel_y_davis@example.com", "password123"),
    new User(2, "L Lawliet", "ryuuzaki@example.com", "password456"),
    new User(3, "JP", "jotape@example.com", "password789")
];

export { mockDatabase, mockCategories, mockUsers };

const mongoose = require("mongoose");
require("dotenv").config();

const Menu = require("./models/Menu");

const FOOD = [
  // FAST FOOD
  { name: "Classic Burger", price: 650, category: "Fast Food" },
  { name: "Zinger Burger", price: 750, category: "Fast Food" },
  { name: "Chicken Burger", price: 700, category: "Fast Food" },
  { name: "Chicken Shawarma", price: 450, category: "Fast Food" },
  { name: "Chicken Strips", price: 550, category: "Fast Food" },
  { name: "Loaded Fries", price: 450, category: "Fast Food" },
  { name: "Chicken Nuggets", price: 500, category: "Fast Food" },
  { name: "Grilled Sandwich", price: 500, category: "Fast Food" },
  { name: "Club Sandwich", price: 600, category: "Fast Food" },
  { name: "Chicken Wrap", price: 500, category: "Fast Food" },

  // PIZZA
  { name: "Chicken Fajita Pizza", price: 1100, category: "Pizza" },
  { name: "Chicken Tikka Pizza", price: 1100, category: "Pizza" },
  { name: "Pepperoni Pizza", price: 1250, category: "Pizza" },
  { name: "Cheese Pizza", price: 950, category: "Pizza" },
  { name: "BBQ Chicken Pizza", price: 1200, category: "Pizza" },
  { name: "Malai Boti Pizza", price: 1200, category: "Pizza" },
  { name: "Vegetable Pizza", price: 900, category: "Pizza" },
  { name: "Creamy Chicken Pizza", price: 1200, category: "Pizza" },
  { name: "Peri Peri Pizza", price: 1150, category: "Pizza" },
  { name: "Mexican Pizza", price: 1150, category: "Pizza" },

  // CROWN CRUST
  { name: "Chicken Crown Crust", price: 1350, category: "Crown Crust" },
  { name: "Cheese Crown Crust", price: 1250, category: "Crown Crust" },
  { name: "BBQ Crown Crust", price: 1400, category: "Crown Crust" },
  { name: "Malai Boti Crown Crust", price: 1450, category: "Crown Crust" },
  { name: "Fajita Crown Crust", price: 1400, category: "Crown Crust" },

  // DESI
  { name: "Chicken Karahi", price: 1200, category: "Desi" },
  { name: "Mutton Karahi", price: 1800, category: "Desi" },
  { name: "Chicken Biryani", price: 450, category: "Desi" },
  { name: "Chicken Handi", price: 1100, category: "Desi" },
  { name: "Chicken Tikka", price: 700, category: "Desi" },
  { name: "Seekh Kebab", price: 650, category: "Desi" },
  { name: "Beef Pulao", price: 550, category: "Desi" },
  { name: "Daal Makhani", price: 500, category: "Desi" },
  { name: "Butter Chicken", price: 950, category: "Desi" },
  { name: "Chicken Chowmein", price: 700, category: "Desi" },

  // COLD DRINKS
  { name: "Coca Cola", price: 120, category: "Cold Drinks" },
  { name: "Pepsi", price: 120, category: "Cold Drinks" },
  { name: "7UP", price: 120, category: "Cold Drinks" },
  { name: "Sprite", price: 120, category: "Cold Drinks" },
  { name: "Mountain Dew", price: 120, category: "Cold Drinks" },
  { name: "Fanta", price: 120, category: "Cold Drinks" },

  // DRINKS
  { name: "Mint Margarita", price: 350, category: "Drinks" },
  { name: "Lemonade", price: 300, category: "Drinks" },
  { name: "Blue Lagoon", price: 400, category: "Drinks" },
  { name: "Strawberry Mojito", price: 400, category: "Drinks" },
  { name: "Fresh Lime", price: 250, category: "Drinks" },
  { name: "Peach Iced Tea", price: 350, category: "Drinks" },

  // DESSERTS
  { name: "Chocolate Cake", price: 500, category: "Desserts" },
  { name: "Brownie", price: 450, category: "Desserts" },
  { name: "Cheesecake", price: 550, category: "Desserts" },
  { name: "Chocolate Sundae", price: 400, category: "Desserts" },
  { name: "Ice Cream", price: 350, category: "Desserts" },
];

async function seedMenu() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI .env file mein nahi mila");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    for (const item of FOOD) {
      await Menu.findOneAndUpdate(
        { name: item.name },
        {
          $set: {
            name: item.name,
            price: item.price,
            category: item.category,
            available: true,
          },
          $setOnInsert: {
            description: "",
            image: "",
          },
        },
        { upsert: true, new: true, runValidators: true },
      );
    }

    console.log(`${FOOD.length} food items successfully saved!`);

    const total = await Menu.countDocuments();
    console.log("Total menu items in database:", total);
  } catch (error) {
    console.error("Menu seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedMenu();

import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();
const app = express();

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.get("/scrape-products", async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    
    await Product.deleteMany();

    await Product.insertMany(data);

    res.json({
      message: "Products scraped & saved successfully",
      total: data.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

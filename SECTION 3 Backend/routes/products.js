import express from "express";
import { body, validationResult } from "express-validator";
import authenticate from "../middleware/authUser.js";
import limiter from "../middleware/rateLimit.js";
import Product from "../models/Product.js";

const router = express.Router();

//  ROUTE 1: Get all products. it will be used by all users or get all products.
router.get('/all-products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("error fetching products:", error.message);
    res.status(500).json({ error: 'Failed to fetch the products' });
  }
});

// ROUTE 2: Get user-specific products 
router.get('/', authenticate, limiter, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id }); // Only fetch products for the logged-in user
    res.json(products);
  } catch (error) {
    console.error("error fetching products:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Add a new product 
router.post(
  '/add',
  authenticate,
  limiter,
  [
    body("name").isLength({ min: 3}).withMessage("Name should be at least 3 characters"),
    body("price").isFloat({ gt: 0}).withMessage("Price should be a positive number"),
    body("image").notEmpty().withMessage("Image is required but can use a placeholder"),
    body("description").isLength({ min: 10}).withMessage("Description should be at least 10 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, price, image, description } = req.body;

      const product = new Product({ name, price, image, description, userId: req.user.id });
      const savedProduct = await product.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error adding product:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 4: Update an existing product 
router.put('/update/:id', authenticate, limiter, async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    // Create a new object with the updated fields
    const updatedProduct = { name, price, image, description };

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Allow update only if the product is valid user, i.e. the user who created the product
    if (product.userId.toString() !== req.user.id) {
      return res.status(403).send(" You have No Permission to update this product");
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, { $set: updatedProduct }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating the product:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ ROUTE 5: Delete a product user should authorize to delete the product
router.delete('/delete/:id', authenticate, limiter, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Allow delete only if the product belongs to the user
    if (product.userId.toString() !== req.user.id) {
      return res.status(403).send("You have No Permission to delete this product");
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: "Product has been deleted", product });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

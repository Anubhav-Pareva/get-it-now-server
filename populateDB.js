import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./mongoose-model/productModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_LINK;

async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=194");
  const data = await res.json();
  return data.products;
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

async function populateDatabase() {
  await connectDB();

  const products = await fetchProducts();

  // Optional: Clear existing data
  await ProductModel.deleteMany({});

  for (const product of products) {
    // Normalize dummyjson fields to match your schema
    const formattedProduct = {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      tags: product.tags || [],
      brand: product.brand,
      sku: product.sku || "",
      weight: product.weight || 0,
      dimensions: product.dimensions || { width: 0, height: 0, depth: 0 },
      warrantyInformation: product.warrantyInformation || "",
      shippingInformation: product.shippingInformation || "",
      availabilityStatus: product.availabilityStatus || "In Stock",
      reviews: product.reviews || [],
      returnPolicy: product.returnPolicy || "",
      minimumOrderQuantity: product.minimumOrderQuantity || 1,
      meta: {
        createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
        updatedAt: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      },
      barcode: product.barcode || "",
      qrCode: product.qrCode || "",
      images: product.images || [],
      thumbnail: product.thumbnail || "",
    };

    try {
      await ProductModel.create(formattedProduct);
      console.log(`Inserted: ${product.title}`);
    } catch (err) {
      console.error(`Error inserting product "${product.title}":`, err.message);
    }
  }

  console.log("Database population complete!");
  mongoose.disconnect();
}

populateDatabase();

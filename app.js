import express from "express";
import connectDB from "./configDB/db.js";
import { productModel } from "./models/productsModel.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// get all products
app.get("/getAllProducts", async (req, res) => {
  const data = await productModel.find();
  res.json({ message: "success", data, total: data?.length });
});

// create products
app.post("/createProducts", async (req, res) => {
  const { name, price, image } = req.body;

  try {
    const data = new productModel({ name, price, image });
    await data.save();

    res.status(201).json({ status: true, message: "Products created" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to create product, try again...!",
    });
  }
});

// update products
app.post("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await productModel.findByIdAndUpdate(id, data);

    res.status(200).json({ status: true, message: "Products updated" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to update, try again...!",
    });
  }
});

// delete products
app.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await productModel.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "Products deleted" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to delete, try again...!",
    });
  }
});

app.listen(8000, () => {
  connectDB();
  console.log("server is running on port 8000...");
});

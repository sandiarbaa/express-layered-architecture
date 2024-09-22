const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json()); // untuk parse data dari form

// Endpoint
app.get("/api", (req, res) => {
  const message = {
    name: "Sandi",
    age: 20,
  };
  res.send(message);
});

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Express API running in port: ${PORT}`);
});

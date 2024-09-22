// Layer for handling request and response
// usually also handles body validation
const express = require("express");
const prisma = require("../database/index");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.status(200).send({
    status: "success",
    message: "get products success",
    data: products,
  });
});

router.get("/:id", async (req, res) => {
  // we use try catch here, because the controller handling request and response, not services
  try {
    const productId = parseInt(req.params.id);

    const product = await getProductById(productId);

    res.status(200).send({
      status: "success",
      message: "get product success",
      data: product,
    });
  } catch (error) {
    // err.message exist from service, throw Error
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.status(201).send({
      status: "success",
      message: "create product success",
      data: product,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteProductById(parseInt(productId));

    res.status(200).send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const productData = req.body;

  // if all fields exist, then allow to edit
  // here (from services)
  if (
    !(
      productData.image &&
      productData.name &&
      productData.description &&
      productData.price
    )
  ) {
    return res.status(400).send("Some fields are missing!");
  }

  const product = await updateProductById(productId, productData);

  res.status(200).send({
    status: "success",
    message: "edit product success",
    data: product,
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    const product = await updateProductById(productId, productData);

    res.status(200).send({
      status: "success",
      message: "edit product success",
      data: product,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

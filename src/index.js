const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client"); // sbgi representasi db

const prisma = new PrismaClient(); // dimasukan ke variabel dan sudah terkonek dgn db
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

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany(); // ambil seluruh data products dari db simpan ke variabel
  res.status(200).send({
    status: "success",
    message: "get products success",
    data: products,
  });
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  // bisa pakai findFirst atau findUnique
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    res.status(400).send("product not found");
  }

  res.status(200).send({
    status: "success",
    message: "get product success",
    data: product,
  });
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  });

  // res.status(201).send('create product success');
  // res.send("create product success");
  res.status(201).send({
    status: "success",
    message: "create product success",
    data: product,
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id; // string

  await prisma.product.delete({
    where: {
      id: Number(productId),
    },
  });

  res.status(200).send("product deleted");
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

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

  const product = await prisma.product.update({
    // SELECT * FROM Product WHERE id = {productId}
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });

  res.status(200).send({
    status: "success",
    message: "edit product success",
    data: product,
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });

  res.status(200).send({
    status: "success",
    message: "edit product success",
    data: product,
  });
});

app.listen(PORT, () => {
  console.log(`Express API running in port: ${PORT}`);
});

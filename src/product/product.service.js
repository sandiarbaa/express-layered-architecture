// the purpose of the service is to handle business logic
// separated so that its responsibilities are isolated, and its functions can be reused
const prisma = require("../database/index");
const {
  findProducts,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);

  if (findProduct) {
    throw Error("Product already exists");
  }

  const product = await insertProduct(newProductData);
  return product;
};

const deleteProductById = async (id) => {
  // recall a service that has been created
  // implementation reusable the function services
  // reusable function === cleancode
  await getProductById(id);

  await deleteProduct(id);
};

// the services updateProductById responsible for updating product data only
// for handle the fields exist or not, we can use controllers specifically for handle request
// because the fields exist from request
const updateProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
};

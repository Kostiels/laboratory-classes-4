const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");
const Product = require("../models/Product");

const getProductsView = (_request, response) => {
  const products = Product.getAll();
  response.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products: products,
  });
};

const getAddProductView = (_request, response) => {
  response.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
};

const addNewProduct = (request, response) => {
  const { name, description } = request.body;
  const product = new Product(name, description);
  Product.add(product);
  response.redirect("/products/new");
};

const getNewProductView = (_request, response) => {
  const product = Product.getLast();
  response.render("new-product.ejs", {
    headTitle: "Shop - New product",
    path: "/new",
    activeLinkPath: "/products/new",
    menuLinks: MENU_LINKS,
    newestProduct: product,
  });
};

const getProductView = (request, response) => {
  const productName = request.params.name;
  const product = Product.findByName(productName);
  response.render("product.ejs", {
    headTitle: `Shop - ${product.name}`,
    path: `/products/${productName}`,
    activeLinkPath: "/products",
    menuLinks: MENU_LINKS,
    product: product,
  });
};

const deleteProduct = (request, response) => {
  const productName = request.params.name;
  Product.deleteByName(productName);
  response.status(STATUS_CODE.OK).json({ success: true });
};

module.exports = {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct
};
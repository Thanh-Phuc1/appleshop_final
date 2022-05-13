const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const Admin = require("../model/Admin");
const User = require("../model/User");
const Product = require("../model/Product");
const Cart = require("../model/Cart");
const productController = {};

productController.getAllProduct = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const countProduct = await Product.countDocuments({});
  const totalPage = Math.ceil(countProduct / limit);
  const offSet = limit * (page - 1);
  let productList = await Product.find({})
    .sort({ createAt: -1 })
    .skip(offSet)
    .limit(10);
  return sendResponse(
    res,
    200,
    { productList, totalPage },
    null,
    "List all Product"
  );
});
// find by price

productController.filterProducts = catchAsync(async (req, res, next) => {
  const { price } = req.body;
  const product = await Product.find({ price: price });
  if (!product) {
    throw new AppError(404, "Product not found", "Get fitter product error");
  }
  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "Filter product successful"
  );
});

module.exports = productController;

const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const User = require("../model/User");
const Product = require("../model/Product");
const Cart = require("../model/Cart");
const cartController = {};

cartController.addProductToCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { productId } = req.body;

  const product = await Product.findOne({ _id: productId });
  console.log(product);
  if (!product) {
    throw new AppError(404, "Product not found", "Add product error");
  }

  let productCart = await Cart.findOne({ owner: currentUserId });
  if (!productCart) {
    productCart = await Cart.create({
      owner: currentUserId,
      products: [
        {
          product: productId,
          quantity: 1,
        },
      ],
    });
  } else if (!productCart.products.some((item) => item.product == productId)) {
    productCart.products.push({ product: productId, quantity: 1 });
  } else {
    throw new AppError(404, "Product already in the cart", "Add product error");
  }

  productCart.save();
  return sendResponse(
    res,
    200,
    true,
    productCart,
    null,
    "Add product to cart successful"
  );
});

cartController.getListProductsCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 2;
  const offset = limit * (page - 1);

  const currentCart = await Cart.findOne({ owner: currentUserId })
    .populate("owner")
    .populate({ path: "products", populate: "product" });
  console.log(currentCart);
  if (!currentCart) {
    throw new AppError(404, "productCart not found", "get list product error");
  }

  return sendResponse(
    res,
    200,
    true,
    { currentCart },
    null,
    "Get list products cart success"
  );
});

cartController.updateProductCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { quantity, productId } = req.body;
  const { cartId } = req.params;

  let productCart = await Cart.findOne({
    owner: currentUserId,
    _id: cartId,
  });
  if (!productCart) {
    throw new AppError(
      404,
      "You can not update this product cart",
      "update product cart error"
    );
  } else if (!productCart.products.some((item) => item.product == productId)) {
    productCart.products.push({ product: productId, quantity: 1 });
  } else {
    productCart.products.find((item) => item.product == productId).quantity =
      parseInt(quantity);
  }

  productCart.save();

  return sendResponse(
    res,
    200,
    true,
    productCart,
    null,
    "Update cart successful"
  );
});

cartController.deleteProductCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { productId } = req.body;
  const { cartId } = req.params;

  let productCart = await Cart.findOne({
    owner: currentUserId,
    _id: cartId,
  });
  if (!productCart) {
    throw new AppError(
      404,
      "You can not deleted this product cart",
      "deleted product cart error"
    );
  } else if (
    !productCart.products.some((item) => item.product.toString() === productId)
  ) {
    throw new AppError(
      404,
      "You can not deleted this product cart",
      "deleted product cart error"
    );
  } else {
    productCart.products = productCart.products.filter((item) => {
      console.log(typeof item.product.toString());
      console.log(typeof productId);
      return item.product.toString() !== productId;
    });
  }
  productCart.save();
  return sendResponse(
    res,
    200,
    true,
    productCart,
    null,
    "deleted product cart successful"
  );
});

module.exports = cartController;

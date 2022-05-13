const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const {
  addProductToCart,
  getListProductsCart,
  updateProductCart,
  deleteProductCart,
} = require("../controllers/cart.controllers");
const { loginRequired } = require("../middleware/authentication");
const { validate, checkObjectId } = require("../middleware/validator");

router.post(
  "/add",
  loginRequired,
  validate([body("productId").exists().isString().custom(checkObjectId)]),
  addProductToCart
);

router.get("/list", loginRequired, getListProductsCart);

router.put(
  "/update/:cartId",
  loginRequired,
  validate([
    param("cartId").exists().isString().custom(checkObjectId),
    body("productId").exists().isString(),
    body("quantity").exists(),
  ]),
  updateProductCart
);

router.delete(
  "/delete/:cartId",
  loginRequired,
  validate([param("cartId").exists().isString().custom(checkObjectId)]),
  deleteProductCart
);

module.exports = router;

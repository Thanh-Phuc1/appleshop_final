const express = require("express");
const {
  getAllProduct,
  filterProducts,
} = require("../controllers/product.controller");
const router = express.Router();

/**
 * @description: Get all product
 * @access: Public
 * @method: get
 */
router.get("/getAllProduct", getAllProduct);

/**
 * @description: Fitter Product by Price
 * @access: Public
 * @method: Post
 */
router.post("/fitterPrice", filterProducts);

module.exports = router;

const express = require("express");
const {
  registerAdmin,
  adminLogin,
  getAllUser,
  createProduct,
  getAllProduct,
} = require("../controllers/admin.controllers");
const { loginRequired, isAdmin } = require("../middleware/authentication");
const router = express.Router();

/**
 * @description: Create admin
 * @access:
 * @method: POST/post
 */
router.post("/registerAdmin", registerAdmin);
//ad login
router.post("/adminLogin", adminLogin);
/**
 * @description: Admin can see a list of user
 * @access:
 * @method: get
 */
router.get("/getAllUser", getAllUser);

// Create Product
router.post("/createProduct", loginRequired, isAdmin, createProduct);
//Get all product
router.get("/getAllProduct", getAllProduct);

module.exports = router;

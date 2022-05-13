const express = require("express");

const {
  registerUser,
  userlogin,
  getAllProduct,
  getCurrentUserProfile,
  updateCurrentUser,
  deactivateCurrentUser,
} = require("../controllers/users.controllers");
const { loginRequired } = require("../middleware/authentication");
const router = express.Router();
/**
 * @description: Create an account by email
 * @access: Public
 * @method: POST/post
 */
router.post("/registerUser", registerUser);
/**
 * @description: Login user by email and password
 * @access: Public
 * @method: POST/post
 */
router.post("/userlogin", userlogin);
/**
 * @description: User can see all product
 * @access: Public
 * @method: get
 */
router.get("/getAllProduct", getAllProduct);
/**
 * @description: User can see profile login => get
 * @access: Public
 * @method: get
 */
router.get("/me/get", loginRequired, getCurrentUserProfile);
/**
 * @description: User can update own account profile.
 * @access: Public
 * @method: put
 *  */
router.put("/me/update", loginRequired, updateCurrentUser);
/**
 * @description: User can delete account(Delete).
 * @access: Public
 * @method: delete
 *  */
router.delete("/me/deactivate", loginRequired, deactivateCurrentUser);

module.exports = router;

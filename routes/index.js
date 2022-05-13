const express = require("express");
const router = express.Router();
const userRouter = require("./users.api");
const adminRouter = require("./admin.api");
const productRouter = require("./products.api");
const cart = require("./cart.api");

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/products", productRouter);
router.use("/cart", cart);

module.exports = router;

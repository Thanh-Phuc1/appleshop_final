const jwt = require("jsonwebtoken");
const { AppError } = require("../helpers/utils");
const { checkObjectId } = require("./validator");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = {};
// check user login
authMiddleware.loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new AppError(401, "Token is Missing", "Login Require Error");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        throw new AppError(401, "Token Error", "Login Require Error");
      }
      checkObjectId(payload._id);
      req.currentUserId = payload._id;
      req.currentRole = payload.role;
    });
    next();
  } catch (error) {
    next(error);
  }
};

authMiddleware.isAdmin = (req, res, next) => {
  try {
    const role = req.currentRole;
    if (role !== "admin") {
      throw AppError(401, "Not Admin", "Athentication Error!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;

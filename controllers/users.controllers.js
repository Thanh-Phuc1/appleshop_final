const bcrypt = require("bcryptjs");
const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const User = require("../model/User");
const Product = require("../model/Product");

const userController = {};
// creat User by email and password
userController.registerUser = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    throw new AppError(
      409,
      "User already exits",
      "Register Error! Please change email!"
    );
  // neu khong trung user thi bam password bang bcrypt
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  // tao user truyen du lieu vao
  user = await User.create({
    name,
    email,
    password,
  });
  // khi tao xong thi tao accessToken
  const accessToken = user.generateToken();

  return sendResponse(
    res,
    200,
    { user, accessToken },
    null,
    "Create Success Account"
  );
});
//user login
userController.userlogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "+password");
  if (!user) {
    throw new AppError(400, "Login fail", "Login Error");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Invalid credentials", "Login not Match Token");
  }
  const accessToken = user.generateToken();
  return sendResponse(res, 200, { user, accessToken }, null, "Login Success");
});
// user can see all product
userController.getAllProduct = catchAsync(async (req, res, next) => {
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

userController.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    throw new AppError(404, "User Not Found", "Get current user error");
  }
  return sendResponse(
    res,
    200,
    currentUser,
    null,
    "Get current user successful"
  );
});

userController.updateCurrentUser = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let user = await User.findById(currentUserId);
  if (!user) {
    throw new AppError(404, "User Not Found", "Get current user error");
  }
  const allows = ["name", "email"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });
  await user.save();
  return sendResponse(res, 200, user, null, " Update profile successful");
});

userController.deactivateCurrentUser = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  //delete password confirm
  await User.findByIdAndUpdate(
    currentUserId,
    { isDeleted: true },
    { new: true }
  );
  return sendResponse(res, 200, {}, null, "Deactivate user successful");
});
module.exports = userController;

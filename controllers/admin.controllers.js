const bcrypt = require("bcryptjs");
const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const Admin = require("../model/Admin");
const User = require("../model/User");
const Product = require("../model/Product");

const adminController = {};
adminController.registerAdmin = catchAsync(async (req,res,next) => { 
    let { name, email, password } = req.body;
    let  admin  = await Admin.findOne({ email });
    if(admin) throw new AppError(409,"Admin already exits","Register Error! Please change email!");
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt);
    admin = await Admin.create({
        name,email,password });
    // khi tao xong thi tao accessToken
    const accessToken =  admin.generateToken();

    return sendResponse(res,200,{ admin, accessToken }, null , "Create Success Account" )
});
    //admin login
    adminController.adminLogin =  catchAsync(async (req,res,next) => {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email }, "+password" );
        if(!admin) { throw new AppError(400,"Login fail", "Login Error")};
        const isMatch = await bcrypt.compare(password,admin.password)  
        if (!isMatch) {
            throw new AppError(400, "Invalid credentials", "Login not Match Token");
           }
           const accessToken = admin.generateToken();
        return sendResponse(res,200,{admin, accessToken},null,"Login Success")
    });
    //get all user
    adminController.getAllUser = catchAsync(async (req,res,next) => {
        let { page, limit } = req.query ;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const countUser = await User.countDocuments({});
        const totalPage = Math.ceil(countUser/limit);
        // offset so cac phan tu bo qua
        const offSet = limit * (page - 1);
        let userList = await User.find({}).sort({ createAt: -1 }).skip(offSet).limit(10);
        return sendResponse(res,200,{userList, totalPage },null,"List all user")

    });
    // create product

    adminController.createProduct = catchAsync(async (req,res,next) => {
        let { nameProduct, description, image,price } = req.body;
        let product = await Product.findOne( { nameProduct } );
        if(product) throw new AppError(409,"Product already exits","Create Error! Please change name Product!");
        product = await Product.create({
            nameProduct, description, image, price
        });
        return sendResponse(res,200,{ product }, null , "Create Success Product" )
    });
    adminController.getAllProduct = catchAsync(async (req,res,next) => {
        let { page, limit } = req.query ;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const countProduct = await Product.countDocuments({});
        const totalPage = Math.ceil(countProduct/limit);
        const offSet = limit * (page - 1);
        let productList = await Product.find({}).sort({ createAt: -1 }).skip(offSet).limit(10);
        return sendResponse(res,200,{productList, totalPage },null,"List all Product")

    });

module.exports = adminController;
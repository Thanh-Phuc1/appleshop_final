# Apple Product

## Description :

An apple technology product sales website application. Buyers can order products and pay for products.

### Features :

#### User Flow :

1. Users can create account with email and password ✅
2. Users can login with email and password ✅
3. Users can see All products ✅
4. Owner can see own user's information.✅
5. Owner can update own account profile. ✅
6. User can deactivate account(Delete) ✅

##### CRUD with admin :

1. Admin can login with email and password ✅
2. Admin can see a list of user ✅
3. Admin can see all product list ✅
4. Admin can create product ✅
5. Admin can Update product
6. Admin can Delete product

##### Product Flow :

1. See all product ✅
2. Fitter Product by Price ✅

##### Cart Flow :

1. Authentication user can add a product to Cart ✅
2. Authentication user can see a list products in Cart ✅
3. Authentication user can update amount products in Cart ✅
4. Authentication user can delete products in Cart ✅

### Production API :

[Doc]

[App demo]

### Project setup :

1.Generate express boiler plate:
npx express-generator --no-view
npm install
touch .gitignore .env

2.Install project dependencies :
npm i nodemon cors bcryptjs dotenv
npm i jsonwebtoken mongoose
npm i express-async-errors

3. Add dev script :
   {
   "scripts":{
   ...
   "dev":"nodemon ./bin/www"
   }
   }
   npm i nodemon

### The end

@copyright by Thanh Phuc Le

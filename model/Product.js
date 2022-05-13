const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    nameProduct: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    isDeleted: { type: Boolean, default: false }
},
 { timestamps: true });

//  productSchema.methods.toJSON = function () {
//     const obj = this._doc;
//     return obj;
// };

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
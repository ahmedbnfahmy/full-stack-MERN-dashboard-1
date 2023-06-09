const mongoose = require("mongoose")

const wishListSchema = new mongoose.Schema(
    {
        items: [{productId: {type: mongoose.Schema.Types.ObjectId,ref: "Product"}}],

        userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User' , unique:true }
     
    },
    {
        timestamps: true
    }
    
);
module.exports = mongoose.model('WishList', wishListSchema);
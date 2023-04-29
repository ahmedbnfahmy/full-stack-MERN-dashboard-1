
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
        shippingAddress: {
            country: { type: String },
            fullName: { type: String },
            city: { type: String },
            phone: { type: Number },
            governate: { type: String }
        },
        paymentmethod: {
            type: String,
            default: 'CashOnDelivery'
        },
        shippingPrice: { type: Number ,  default: 50  },
        taxPrice: { type: Number },
        totalPrice: { type: Number },
        isPaid: { type: Boolean, default: false },
        isDelivered: { type: Boolean, default: false },
        isCancelled: { type: Boolean, default: false },
        // sellerId: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Order', orderSchema);
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const dayjs = require('dayjs');

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now,
        get: timeStamp =>  dayjs(timeStamp).format('M/DD/YYYY h:m a') 
    },
    isDelivery:{
        type: Boolean,
        default: false
      },
    meals:[
        {
            drink: String,
            image: String,
            main: String,
            price: String,
            purchaseQuantity: String,
            total: String,
            _id: String,
        }
    ]
});

const Order = mongoose.models.Order || model('Order', orderSchema);

module.exports = Order;
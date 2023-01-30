import mongoose from 'mongoose'

const { Schema,model } = mongoose

mongoose.Promise = global.Promise

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  productionCapacity: {
    type: Number,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createAt: {
    type: Date,
    defalut: Date.now(),
  },
})

ProductsSchema.index({ name: 'text' })
const Product = mongoose.models.Product || model('Product', ProductsSchema);
module.exports = Product;
  

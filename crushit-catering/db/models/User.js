import mongoose from 'mongoose';
import dayjs from 'dayjs';
import Order from './Order'

const { Schema,model } = mongoose

mongoose.Promise = global.Promise

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  orders:[Order.schema],
  address:{
    StreetAddress: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timeStamp =>  dayjs(timeStamp).format('M/DD/YYYY h:m a') 
  },
})

//UserSchema.index({ name: 'text' })
const User = mongoose.models.User || model('User', userSchema);

module.exports = User;
  

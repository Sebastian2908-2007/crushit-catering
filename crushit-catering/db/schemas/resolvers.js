import {User,Order} from '../models';

const resolvers = {
    Query: {
      // products
      getUsers: async () => {
        try {
          const Users = await User.find({});
  
          return Users;
        } catch (err) {
          console.log(err);
        }
      },
      getUser: async (_, { id }) => {
        const User = await User.findById(id);
  
        if (!User) {
          throw new Error('Product not found');
        }
  
        return User;
      },
    },
  
    Mutation: {
      // products
      newUser: async (_, { userName }) => {
        try {
          const user = await User.create({userName});
  
        
  
          return user;
        } catch (err) {
          console.log(err)
        }
      },
      updateUserAddress: async (_, { input }) => {
  
       let user = await User.findOneAndUpdate(
        /**No I still had an old spelling */
      { userName: input.userName }, 

       {
      address:{
          userName: input.userName,        
          streetAddress: input.streetAddress,
          city: input.city,
          state: input.state,
          zip: input.zip,
          country: input.country,
        }
       }, {
          new: true,
        }).populate('address');

        if (!user) {
          throw new Error('user not found')
        }
  
        return user;
      },
      
      addOrder: async (_, { isDelivery,userName,meals }) => {
        //console.log(userName);
        //console.log(isDelivery);
        console.log(meals);
      
        const order = await Order.create({
          isDelivery: isDelivery,
          meals: meals

        });
        
        //console.log(order);
        const user = await User.findOneAndUpdate(
          {userName: userName},
          {
            $push: {orders: order}
          },
          {new: true}
          ).populate('orders').populate('orders.meals');
  
        if (!user) {
          throw new Error('Producto no encontrado')
        }
  
        console.log(user);
  
        return user;
      },
    },
  }
  
  module.exports = resolvers
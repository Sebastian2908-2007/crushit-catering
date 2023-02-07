import {User} from '../models';

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
      /*updateUser: async (_, { id, input }) => {
        let product = await User.findOne(id)
  
        if (!product) {
          throw new Error('Product not found')
        }
  
        product = await Product.findOneAndUpdate({ _id: id }, input, {
          new: true,
        })
  
        return product
      },
      deleteProduct: async (_, { id }) => {
        const product = await Product.findById(id)
  
        if (!product) {
          throw new Error('Producto no encontrado')
        }
  
        await Product.findOneAndDelete({ _id: id })
  
        return 'Producto eliminado'
      },*/
    },
  }
  
  module.exports = resolvers
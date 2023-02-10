import {User,Order} from '../models';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
    Query: {
      // meals
      getUsers: async (parent,args,context) => {
        const url = new URL(context.headers.referer);
        console.log(url.origin);
      //console.log(context);
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
          throw new Error('meal not found');
        }
  
        return User;
      },
     checkout: async (parent,args, context) => {
      try{
        // initialize empty line items array
        const line_items = [];
        // this will get the referer url so we can use it f;or redirect upon a successfull transaction
        const url = new URL(context.headers.referer);
        const order = new Order({ meals: args.meals });
        console.log(order);
        const { meals } = await order.populate('meals');
        console.log(meals);
         /**populate meal image data*/
         /*for (let i = 0; i < meals.length; i++) {
         await meals[i].populate('image')
        }*/
        // add for loop to generate stripe meals and id's as well as adding them to the line_items array
        for (let i = 0; i < meals.length; i++) {
          // generate meal id
          const product = await stripe.products.create({
            name: meals[i].main,
            description: meals[i].drink,
            // the below images do not work in development!
            images: [`${url}/${meals[i].image}`]
          });
          // generate price id using the meal id
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: meals[i].price * meals[i].purchaseQuantity * 100,
            currency: 'usd',
          });
  
          // add price id to the line items array
          line_items.push({
            price: price.id,
            quantity: 1
          });
  
        }
        // create a checkout session for stripe
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}`
        });
        return { session: session.id };
      }catch(e) {
        console.log(e);
      }
      }
    },
  
    Mutation: {
      // meals
      newUser: async (_, { userName }) => {
      const alreadyAUser = await User.findOne({userName:userName});
     if(!alreadyAUser) {
        try {
          const user = await User.create({userName});
          return user;
        } catch (err) {
          console.log(err)
        }
       }
       console.log('user is already active');
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
        if(!meals) {
          return
        }
      
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
          throw new Error('mealo no encontrado')
        }
  
        console.log(user);
  
        return user;
      },
      deleteUser: async (_,{userName}) => {
       const deletedUser = await User.findOneAndDelete({userName: userName});
       return deletedUser;
      }
    },
  }
  
  module.exports = resolvers
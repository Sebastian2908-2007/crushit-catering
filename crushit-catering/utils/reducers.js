// import use reducer from react
import { useReducer } from 'react';

import {
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
     switch (action.type) {
                 case ADD_TO_CART:
                     return{
                         ...state,
                         cartOpen: true,
                         cart: [...state.cart, action.meal] 
                     };
                 case ADD_MULTIPLE_TO_CART:
                     return {
                          ...state,
                          cart: [...state.cart, ...action.products],
                    }; 
                 case REMOVE_FROM_CART:
                     // filter throught the cart and return only products that do not match the provided id
                     let newState = state.cart.filter(meal => {
                         return meal._id !== action._id
                     });
                     return {
                         ...state,
                       // the cart will be set to false if newState is empty
                         cartOpen: newState.length > 0,

                         cart: newState
                         
                     };  
                 case UPDATE_CART_QUANTITY:
                     return {

                        ...state,

                        cartOpen: true,

                        cart: state.cart.map(meal => {
                            if (action._id === meal._id) {
                                meal.purchaseQuantity = action.purchaseQuantity;
                            }
                            return meal;
                        })
                     };
                 case CLEAR_CART:
                     return {
                         ...state,

                         cartOpen: false,

                         cart: []
                     };
                 case TOGGLE_CART:
                        return {

                            ...state,

                            cartOpen: !state.cartOpen
                        }                

             // if it's none of these actions, do not update state at all and keep things the same! 
             default:
                 return state;
     }
};

// This function, useProductReducer(), will be used to help initialize our global state object and then
// provide us with the functionality for updating that state by automatically running it through
// our custom reducer() function. Think of this as a more in-depth way of using the useState() Hook
export function useProductReducer(initialSate) {
    return useReducer(reducer, initialSate);
}

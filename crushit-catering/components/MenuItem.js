import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import DrinkMenu from "./DrinkMenu";
import { ADD_TO_CART,UPDATE_CART_QUANTITY} from "@/utils/actions";
import clientDatabase from "@/utils/dexiedb";
const MenuItem = ({meal,drinks,dispatch,state}) => {
  const currentUrl = useRouter()
  const currentPage = currentUrl.pathname;
    /**state for chosen drink to be passed to drinkmenu*/
    const [chosenDrink,setChosenDrink] = useState(null);
      /**this is state for the text that resides in the product item buttons so that it can be changed when adding to cart */
  const [crtBtnTxt, setCrtBtnTxt] = useState('Add To Cart');
    /**destructure meal*/
    const {
        _id,
        main,
        price,
        image
    } = meal;
    const {cart} = state;
     
  /**add to cart function*/
const addToCart = () => {
    if(!chosenDrink){
        alert('you must choose a drink!!')
        return;
    }else{
    //console.log(chosenDrink);
    meal.drink = chosenDrink;
   // console.log(meal);
    }
    const isItemInCart = cart.find((cartItem) => cartItem._id === _id);
   if(isItemInCart) { 
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: _id,
      purchaseQuantity: parseInt(isItemInCart.purchaseQuantity) + 1
    });
    /**below updates indexedDb in particular the purchaseQuantity field*/
    clientDatabase.cart.update(meal._id,{purchaseQuantity:parseInt(isItemInCart.purchaseQuantity) + 1});
    setCrtBtnTxt('+1 meal added');
setTimeout(() => {
  setCrtBtnTxt('Add To Cart');
},3000);
   }else { 
    dispatch({
      type: ADD_TO_CART,
      /**purchaseQuantity is not on data from db its created right here for the global state */
      meal: { ...meal, purchaseQuantity: 1 }
    });
    /**add to indexedDb with dexie */
    clientDatabase.cart.add({_id: _id,main:main,drink:meal.drink,price:price,image:image,purchaseQuantity:1,total:0});
  }
};

    return(
      currentPage === '/success' ? (
      <div className="flex flex-col items-center p-2 bg-[rgba(0,0,0,.6)] rounded w-full">
        <div className="relative w-full h-[22vh]">
            <Image
            src={image}
            alt='food item'
            fill
            />
        </div>
        <span className="text-white mt-4 bg-site-red p-2 rounded text-site-yellow">{main}</span>
        <span className="text-white mt-4 bg-site-red p-2 rounded text-site-yellow">${price}</span>
    </div>
      ):(
      <div className="flex flex-col items-center p-2 bg-[rgba(0,0,0,.6)] rounded w-full">
        <div className="relative w-full h-[22vh]">
            <Image
            src={image}
            alt='food item'
            fill
            />
        </div>
        <span className="text-white mt-4 bg-site-red p-2 rounded text-site-yellow">{main}</span>
        <DrinkMenu drinks={drinks} setChosenDrink={setChosenDrink}/> 
        <span className="text-white mt-4 bg-site-red p-2 rounded text-site-yellow">${price}</span>
         <button onClick={addToCart} className="bg-site-red text-white mt-4 p-2 rounded-full mt-4">{crtBtnTxt}</button>
        <span className="text-site-yellow mt-4 text-xs  p-1 rounded">*All meals come with beans and rice</span>
      </div>
      )
    );
};

export default MenuItem;


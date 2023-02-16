import { useState} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import DrinkMenu from "./DrinkMenu";
import { ADD_TO_CART} from "@/utils/actions";
import clientDatabase from "@/utils/dexiedb";
import returnRandomId from "@/utils/menuIdGen";
const MenuItem = ({meal,drinks,dispatch,state,setShowNoDrinkModal}) => {
  const currentUrl = useRouter()
  const currentPage = currentUrl.pathname;
    /**state for chosen drink to be passed to drinkmenu*/
    const [chosenDrink,setChosenDrink] = useState(null);
      /**this is state for the text that resides in the product item buttons so that it can be changed when adding to cart */
  const [crtBtnTxt, setCrtBtnTxt] = useState('Add To Cart');
  
    /**destructure meal*/
    const {
        main,
        price,
        image
    } = meal;
    const {cart} = state;

const addToCart = () => {
  if(!chosenDrink){
      setShowNoDrinkModal(true)
      return;
  }else{

  //console.log(chosenDrink);
  meal.drink = chosenDrink;
  meal._id = returnRandomId();
  setCrtBtnTxt('added');
  setTimeout(() => {
  dispatch({
    type: ADD_TO_CART,
    /**purchaseQuantity is not on data from db its created right here for the global state */
    meal: { ...meal, purchaseQuantity: 1 }
  });
  /**add to indexedDb with dexie */
  clientDatabase.cart.add({_id: meal._id,main:main,drink:meal.drink,price:price,image:image,purchaseQuantity:1,total:0});
  setChosenDrink(null);
  setCrtBtnTxt('add again');
  },2000);
 // console.log(meal);
  }
};


    return(
      currentPage === '/success1' ? (
      <div className="flex flex-col
       items-center
       p-2
       bg-[rgba(255,191,55,.5)]
       rounded
       w-full
       border-2
       border-white
      ">
        <div className="
         relative
         w-full
         h-[25vh]
         border-2
         border-white
         md:h-[15vh]
         xl:h-[25vh]
        ">
            <Image
            src={image}
            alt='food item'
            fill
            />
        </div>
        <span className="text-white mt-4 bg-site-red p-2 rounded text-white">{main}</span>
        <span className="text-white mt-4 bg-site-red p-2 rounded text-white">${price}</span>
    </div>
      ):(
      <div className="flex
       flex-col
       items-center
       p-2
       bg-[rgba(255,191,55,.5)]
       rounded 
       w-full
       border-2
       border-white
       "
      >
        <div className="
         relative
         w-full
         h-[25vh]
         border
         border-white
         rounded
         md:h-[15vh]
         lg:h-[25vh]
        ">
            <Image
            src={image}
            alt='food item'
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            11vw"
            fill
            />
        </div>
        <div className="
       flex
       flex-col
       min-[360px]:flex-row
       min-[360px]:justify-between
       min-[360px]:w-full
       items-center">
        <span className="text-white mt-4 bg-site-red p-2 rounded text-white md:p-[0.4rem]">{main}</span>
        <DrinkMenu drinks={drinks} setChosenDrink={setChosenDrink}/> 
        </div>
        <span className="text-white mt-4 bg-site-red p-2 rounded text-white">${price}</span>
         <button onClick={addToCart} className="
         bg-site-red
          text-white
          mt-4
          p-2
          rounded-full
          mt-4
          hover:border
          hover:border-white
          hover:bg-site-yellow
          hover:text-site-red
         ">{crtBtnTxt}</button>
        <span className="text-white mt-4 text-xs  p-1 rounded">*All meals come with beans and rice</span>
      </div>
      )
    );
};

export default MenuItem;


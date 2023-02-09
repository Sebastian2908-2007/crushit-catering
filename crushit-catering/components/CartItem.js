import { useStoreContext } from '@/utils/Globalstate';
import Image from 'next/image';
import {BsTrash} from 'react-icons/bs';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '@/utils/actions';
/**import my dexie singleton so that I can do delete cart items from local db as well as update purchase quantity if needed*/
import clientDatabase from '@/utils/dexiedb';
const CartItem = ({meal}) => {
    const [ state, dispatch ] = useStoreContext();
     /**function to remove items from cart */
 const removeFromCart = () => {
    /**DELETES PRODUCT FROM INDEXEDDB*/
    //clientDatabase.cart.delete(_id);
   dispatch({
     type: REMOVE_FROM_CART,
     _id: meal._id
   })
   /**DELETES PRODUCT FROM INDEXEDDB*/
   clientDatabase.cart.delete(meal._id);
  };

 /**function to update the item quantity as well as remove item from cart if number is zero in input box */
 const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0' ) {
        dispatch({
            type: REMOVE_FROM_CART,
            _id:meal._id
        });
        /**DELETES PRODUCT FROM INDEXEDDB*/
        clientDatabase.cart.delete(meal._id);
    }else {
      /**below if keeps error from going off this still throws a warning when value
       *  is momentarily absent the problen is the empty value '?' being fed to input value*/
      if(value === '') {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: meal._id,
          purchaseQuantity: '?'
      });
        return;
      }
        dispatch({
            type: UPDATE_CART_QUANTITY,
            _id:meal. _id,
            purchaseQuantity: parseInt(value)
        });
        /**below updates indexedDb in particular the purchaseQuantity field*/
        clientDatabase.cart.update(meal._id,{purchaseQuantity:parseInt(value)});
    }
  };

    return(
        <div className='flex flex-col items-center border border-2 border-white mt-4 p-1 bg-[rgba(103,10,10)]' key={meal._id}>
                                   
        <div className='
        relative
         w-32
         h-[12vh]
         mt-2
         border
         border-2
         border-white
         rounded
        '>
        <Image
        className='rounded'
        src={meal.image}
        alt='food you ordered'
        fill
        />
        </div>
        
        <span className='text-site-yellow bg-site-red mt-2 p-1 rounded w-48'>Meal: {meal.main}</span>
        <span className='text-site-yellow bg-site-red  mt-2 p-1 rounded w-48'>Drink: {meal.drink}</span>
        <span className='text-site-yellow bg-site-red  mt-2 p-1 rounded w-48'>
        <input
        className='w-[7%] text-black rounded'
         type="number"
         placeholder={meal.purchaseQuantity}
         value={meal.purchaseQuantity}
         onChange={onChange}
        />
          &nbsp;
        {meal.main} 
        &nbsp;
        meals
        </span>
        <span onClick={removeFromCart} className='text-site-red mt-4'><BsTrash/></span>
    </div>
    );
};
export default CartItem;
import { useState } from 'react';
import {FaCartArrowDown} from 'react-icons/fa'
import { useStoreContext } from '@/utils/Globalstate';
import Image from 'next/image';
const Cart = () => {
    const [showModal, setShowModal] = useState(false);
    const [state, dispatch] = useStoreContext();
    const {cart} = state;
    console.log(cart);
    /**function to calculate the total */
function calculateTotal() {
    let sum = 0;
    cart.forEach(item => {
        sum += item.price * item.purchaseQuantity;
    });
    // toFixed will set the number of digits to appear after decimal point
    return sum.toFixed(2);
  };
  
    return(
        <>
        <button
        onClick={() => {setShowModal(true)}}
        className='
         text-site-yellow
         text-2xl
         
         '
         >
            <FaCartArrowDown/>
        </button>
        {showModal ? (
                <>
                    <div className="fixed inset-0 overflow-y-auto z-50">
                        <div
                            className=" overflow-auto
                             fixed
                             inset-0
                             w-full
                             h-full
                             bg-black
                             opacity-40
                             "
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8 ">
                            <div className="relative
                             w-full
                             max-w-lg
                             p-4
                             mx-auto
                             bg-black
                             rounded-md
                             shadow-lg">
                             {cart.length ? cart.map(meal => (
                                <div className='flex flex-col items-center border border-2 border-white mt-4 p-2 bg-[rgba(103,10,10)]' key={meal._id}>
                                   
                                    <div className='relative w-32 h-[12vh] mt-2 border border-2 border-white rounded'>
                                    <Image
                                    className='rounded'
                                    src={meal.image}
                                    alt='food you ordered'
                                    fill
                                    />
                                    </div>
                                    <span className='text-site-yellow bg-site-red mt-2 p-1 rounded'>Meal: {meal.main}</span>
                                    <span className='text-site-yellow bg-site-red  mt-2 p-1 rounded'>Drink: {meal.drink}</span>
                                    <span className='text-site-yellow bg-site-red  mt-2 p-1 rounded'>{meal.purchaseQuantity} {meal.main} meals</span>
                                </div>
                             )):<div>no orders yet</div>}
                             <div className='flex flex-col items-center'>
                             <strong id='cart-total-strong mt-2'>Total: ${isNaN(calculateTotal()) ? '0': calculateTotal()}</strong>
                             <button className='bg-site-yellow rounded p-1 mt-2 hover:bg-site-red hover:text-site-yellow' onClick={()=> {console.log('checking out B')}}>Checkout</button>
                             </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Cart;
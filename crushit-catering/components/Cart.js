import { useState,useEffect } from 'react';
import {FaCartArrowDown} from 'react-icons/fa'
import { useStoreContext } from '@/utils/Globalstate';
import CartItem from './CartItem';
import clientDatabase from "@/utils/dexiedb";
/**mutation to add user to personal db*/
import { NEW_USER } from '@/utils/mutations';
import { CHECKOUT,GET_ONE_USER  } from "@/utils/queries";
import { useMutation, useLazyQuery } from '@apollo/client';
/**import useSession from next/auth so we can use the email extracted to make our personal db user*/
import {useSession} from 'next-auth/react';
/**stripe pub key*/
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = ({setShowAddressModal,setPrevAddress}) => {
    /**get the next auth session*/
    const { data: session } = useSession();
    /**define create user mutation*/
    const [createUser] = useMutation(NEW_USER);
    const [checkout,{loading,data}] = useLazyQuery(CHECKOUT);
    const [getUserInfo,{data:userData}] = useLazyQuery(GET_ONE_USER);
    const [showModal, setShowModal] = useState(false);
    const [state, dispatch] = useStoreContext();
    const {cart} = state;
    //console.log(session.user.email);
   
    /**function to calculate the total */
function calculateTotal() {
    let sum = 0;
    cart.forEach(item => {
        sum += item.price * item.purchaseQuantity;
         /**below updates indexedDb in particular the purchaseQuantity field*/
     clientDatabase.cart.update(item._id,{total:sum.toFixed(2)});
    });
     
    // toFixed will set the number of digits to appear after decimal point
    return sum.toFixed(2);
  };

  const createNewUser = async () => {
    try{
   await createUser({
    variables:{
        userName: session.user.email
    }
   });
    }catch(e){
        console.log(e);
    }
  };

  const goToCheckout = async () => {
    /**the isdelivery variable is used on success.js to determine whether or not the order to be added to the db is an order or delivery 0 for false 1 for true */
    clientDatabase.isDelivery.add({isDelivery:0});
    try{
        await checkout({
            variables:{
                meals: state.cart
            }
        });
    }catch(e) {
        console.log(e);
    }
  };

  const getPrevAddress = async () => {
    if(session.user.email) {
        try {
     await getUserInfo({
        variables:{
            userName: session.user.email
        }
      });
        }catch(e){
            console.log(e);
        }
    }
    };
  
  /*if data var changes we will be redirected to stripe checkout page*/
  useEffect(() => {
    if (data) {
        stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
        });
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
    const {
        streetAddress,
        city,
        state,
        zip,
        country
    } = userData.getUser.address;
    
    if(!streetAddress || !city || !state || !zip || !country ){
        //console.log('no prev address!!!')
         return;
        } 
    setPrevAddress({streetAddress:streetAddress,city:city,state:state,zip:zip,country:country});
    }
  }, [userData]);
  
    return(
        <>
        <button
        onClick={() => {setShowModal(true),createNewUser()}}
        className='
         text-[rgba(255,191,55,.8)]
         hover:text-white
         text-2xl
         min-[360px]:text-3xl
         md:text-4xl
         xl:text-5xl
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
                             <CartItem key={meal._id} meal={meal}/>
                             )):<div>no orders yet</div>}
                             <div className='flex flex-col items-center'>
                             <strong id='cart-total-strong mt-2'>Total: ${isNaN(calculateTotal()) ? '0': calculateTotal()}</strong>
                            {
                            cart.length ? 
                            <div className='flex flex-row justify-between w-full mt-4'>
                            <button
                             className='
                             bg-site-yellow
                             rounded
                             p-1
                             mt-2
                             hover:bg-site-red
                             hover:text-site-yellow
                            'onClick={()=> {setShowModal(false),goToCheckout()}}>
                                PickUp
                            </button>
                            <button
                             className='
                             bg-site-yellow
                             rounded
                             p-1
                             mt-2
                             hover:bg-site-red
                             hover:text-site-yellow
                            'onClick={()=> {setShowModal(false),setShowAddressModal(true),getPrevAddress()}}>
                                Delivery
                            </button>
                            </div>
                            :
                            null
                            }
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

/*
THIS WAS TESTED IN THE DELIVERY BUTON ONCLICK FUNCTION! MOVING TO THE ADDRESS MODAL
clientDatabase.isDelivery.add({isDelivery:1})
*/
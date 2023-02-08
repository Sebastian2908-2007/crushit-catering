import { useState } from 'react';
import {FaCartArrowDown} from 'react-icons/fa'
import { useStoreContext } from '@/utils/Globalstate';
import CartItem from './CartItem';
import clientDatabase from "@/utils/dexiedb";
/**mutation to add user to personal db*/
import { NEW_USER } from '@/utils/mutations';
import { useMutation } from '@apollo/client';
/**import useSession from next/auth so we can use the email extracted to make our personal db user*/
import {useSession} from 'next-auth/react';
const Cart = ({showAddressModal, setShowAddressModal}) => {
    /**get the next auth session*/
    const { data: session } = useSession();
    /**define create user mutation*/
    const [createUser] = useMutation(NEW_USER);
    //if (status) console.log(session.user.email);
    //console.log(status);
    const [showModal, setShowModal] = useState(false);
    const [state, dispatch] = useStoreContext();
    const {cart} = state;
   
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
  
    return(
        <>
        <button
        onClick={() => {setShowModal(true),createNewUser()}}
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
                            'onClick={()=> {console.log('checking out B')}}>
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
                            'onClick={()=> {setShowModal(false),setShowAddressModal(true)}}>
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
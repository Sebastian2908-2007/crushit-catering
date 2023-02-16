import { useState,useEffect } from "react";
import { ADD_ADDRESS } from "@/utils/mutations";
import { CHECKOUT } from "@/utils/queries";
import { useStoreContext } from "@/utils/Globalstate";
import { useMutation, useLazyQuery,useQuery } from '@apollo/client';
/**need to import this dynamic  */
import clientDatabase from "@/utils/dexiedb";
/**import useSession from next/auth so we can use the email extracted to make our personal db user*/
import {useSession} from 'next-auth/react';
/**stripe pub key*/
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const AddressModal = ({showAddressModal, setShowAddressModal,prevAddress,setPrevAddress}) => {
    //console.log('ADDModal',prevAddress);
    const [state] = useStoreContext();
    const [checkout,{loading,data}] = useLazyQuery(CHECKOUT);
    const { data: session, status } = useSession();
    const [addAddress] = useMutation(ADD_ADDRESS);
   
            
    
    
    const [formData,setFormData] = useState({streetAddress:'',city:'',state:'',zip:'',country:''});
   
    const handleChange = (event) => {
        if(prevAddress) {
            setPrevAddress({streetAddress:null,city:null,state:null,zip:null,country:null})
        }
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

//useEffect(() => {console.log(formData)},[formData]);
const goToCheckout = async () => {
   try{
    await checkout({
        variables:{
            meals: state.cart
        }
    });
   // clientDatabase.isDelivery.add(1);
   }catch(e){
    console.log(e);
   }
};



const handleSubmit = async (event) => {
    event.preventDefault();
    clientDatabase.isDelivery.add({isDelivery:1});
if(status){
    try{
        if(!prevAddress.streetAddress) {
            //console.log('no Prev address',prevAddress);
    await addAddress({
        variables:{
            userName: session.user.email,
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country
        }
    });
    setShowAddressModal(false);
    goToCheckout();
}else{
    //console.log('YES Prev address',prevAddress);
    await addAddress({
        variables:{
            userName: session.user.email,
            streetAddress: prevAddress.streetAddress,
            city: prevAddress.city,
            state: prevAddress.state,
            zip: prevAddress.zip,
            country: prevAddress.country
        }
    });
    setShowAddressModal(false);
    goToCheckout();
}
}catch(e) {
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



    return(
        <>
        {showAddressModal ? (
                <>
                    <div className="fixed inset-0 overflow-y-auto z-50">
                    <div
                            className=" overflow-auto
                             fixed
                             inset-0
                             w-full
                             h-full
                             bg-black
                             opacity-60
                             "
                             onClick={() => setShowAddressModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8 ">
                            <div className="relative
                             w-full
                             max-w-lg
                             mx-auto
                             bg-black
                             rounded-md
                             shadow-lg
                             p-6
                             ">
                                
                               <form onSubmit={handleSubmit} className="bg-site-yellow p-4 flex flex-col rounded border border-4 border-white ">
                               {prevAddress.streetAddress && <button disabled={loading} onClick={(e) => {
                                                      handleSubmit(e)}}>
                                                       Use previous Address ?
                                                            </button>}
                                <label className="mt-4 text-center text-black">Street address</label>
                                <input onChange={handleChange} name="streetAddress" placeholder="Street Address" className="mt-4 rounded text-black"/>
                                <label className="mt-4 text-center text-black">City</label>
                                <input onChange={handleChange} name="city" placeholder="state" className="mt-4 rounded text-black"/>
                                <label className="mt-4 text-center text-black">State</label>
                                <input onChange={handleChange} name="state" placeholder="zip" className="mt- rounded text-black"/>
                                <label className="mt-4 text-center text-black">Zip</label>
                                <input onChange={handleChange} name="zip" placeholder="country" className="mt-4 rounded text-black"/>
                                <label className="mt-4 text-center text-black">Country</label>
                                <input onChange={handleChange} name="country" placeholder="Country" className="mt-4 rounded text-black"/>
                                <button  disabled={loading} type="submit" className="bg-site-red mt-4 rounded p-2 border border-2 border-white">Checkout</button>
                               </form>
                             </div>
                        </div>
                     </div>
        </>
    ):null}
    </>
    )
};

export default AddressModal;
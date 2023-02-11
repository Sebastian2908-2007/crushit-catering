import { useEffect } from "react";
import clientDatabase from "@/utils/dexiedb";
import MenuItem from "@/components/MenuItem";
import { useStoreContext } from '@/utils/Globalstate';
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "@/utils/mutations";
import {useSession} from 'next-auth/react';
import { sendOrderconfirm } from "@/lib/emailerEndPoint";

const SuccessComponent = ({shouldBeDelivered,purchasedFood}) => {
    console.log(
        'INITIAL SBD',
        shouldBeDelivered
    )

if(shouldBeDelivered[0].isDelivery === 0) {
    shouldBeDelivered = false
    console.log('SHOULD BE FALSE',shouldBeDelivered);
}else{
    shouldBeDelivered = true
    console.log('SHOULD BE TRUE',shouldBeDelivered);
}

console.log('OUTSIDE',shouldBeDelivered);

     /**get the next auth session*/
     const { data: session } = useSession();
    const [addOrder,{data}] = useMutation(ADD_ORDER);
    const [state, dispatch] = useStoreContext();
    
   const addOrderToDb = async () => {
        try{
           const addOrderResponse = await addOrder({
                variables:{
                    userName: session.user.email,
                    isDelivery: shouldBeDelivered,
                    meals: purchasedFood
                }
            });
       
//console.log(addOrderResponse.data);
const orders = addOrderResponse.data.addOrder.orders
const mostRecentOrder = orders[orders.length -1]
const userName = addOrderResponse.data.addOrder.userName
//console.log(mostRecentOrder._id);
//console.log(userName);

const emailData = {
    userEmail: userName, 
    orderNumber: mostRecentOrder._id
};
console.log(emailData);
await sendOrderconfirm(emailData);

window.location.assign('/');
await clientDatabase.isDelivery.clear();
await clientDatabase.cart.clear();
       return;
        }catch(e) {
            console.log(e);
        }
        return;
    };
    useEffect(() => {

        setTimeout(() => {
            console.log('timeout running');
               
                    addOrderToDb();
                    purchasedFood = null;
                    return;
               },10000);

    },[])

    return(
        purchasedFood.map(meal => (
            <MenuItem key={meal._id} meal={meal} state={state}/>
        ))
    );
};

export default SuccessComponent;
/**
    
 */

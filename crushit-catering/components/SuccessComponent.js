import { useEffect } from "react";
import { useRouter } from 'next/router';
import MenuItem from "@/components/MenuItem";
import { useStoreContext } from '@/utils/Globalstate';
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "@/utils/mutations";
import {useSession} from 'next-auth/react';
import { sendOrderconfirm } from "@/lib/emailerEndPoint";

const SuccessComponent = ({shouldBeDelivered,purchasedFood}) => {
 const router = useRouter();
if(shouldBeDelivered[0].isDelivery === 0) {
    shouldBeDelivered = false
}else{
    shouldBeDelivered = true
}

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

const orders = addOrderResponse.data.addOrder.orders
const mostRecentOrder = orders[orders.length -1]
const userName = addOrderResponse.data.addOrder.userName

const emailData = {
    userEmail: userName, 
    orderNumber: mostRecentOrder._id
};
console.log(emailData);
await sendOrderconfirm(emailData);

router.push('/success2');

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


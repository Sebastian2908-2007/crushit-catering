import { useEffect } from "react";
import { useRouter } from 'next/router';
import MenuItem from "@/components/MenuItem";
import { useStoreContext } from '@/utils/Globalstate';
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "@/utils/mutations";
import {useSession} from 'next-auth/react';
import { sendOrderconfirm } from "@/lib/emailerEndPoint";


const SuccessComponent = ({purchasedFood,shouldBeDelivered}) => {
console.log(shouldBeDelivered);
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
        <section className="w-full
        p-4
        grid
        grid-cols-1
        gap-4
        min-[540px]:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        lg:pt-12
        xl:pt-14
        2xl:pt-16
        ">
       {purchasedFood && purchasedFood.map(meal => (
            <MenuItem key={meal._id} meal={meal} state={state}/>
        ))}
        </section>
    );
};

export default SuccessComponent;


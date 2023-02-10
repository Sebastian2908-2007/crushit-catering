import { useEffect } from "react";
import clientDatabase from "@/utils/dexiedb";
import MenuItem from "@/components/MenuItem";
import { useStoreContext } from '@/utils/Globalstate';
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "@/utils/mutations";
import {useSession} from 'next-auth/react';

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
    const [addOrder] = useMutation(ADD_ORDER);
    const [state, dispatch] = useStoreContext();
    
   const addOrderToDb = async () => {
        try{
            await addOrder({
                variables:{
                    userName: session.user.email,
                    isDelivery: shouldBeDelivered,
                    meals: purchasedFood
                }
            });
       

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

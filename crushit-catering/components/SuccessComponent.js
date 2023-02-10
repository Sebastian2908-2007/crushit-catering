import { useEffect } from "react";
import clientDatabase from "@/utils/dexiedb";
import MenuItem from "@/components/MenuItem";
import { useStoreContext } from '@/utils/Globalstate';
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "@/utils/mutations";
import {useSession} from 'next-auth/react';

const SuccessComponent = ({shouldBeDelivered,purchasedFood}) => {
    console.log(
        'succes Comp rendering'
    )
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
        await clientDatabase.cart.clear();
        await clientDatabase.isDelivery.clear();
        window.location.assign('/');
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

        //addOrderToDb();
    return(
        purchasedFood.map(meal => (
            <MenuItem key={meal._id} meal={meal} state={state}/>
        ))
    );
};

export default SuccessComponent;
/**
    
 */

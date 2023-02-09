import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import clientDatabase from "@/utils/dexiedb";
import MenuItem from "@/components/MenuItem";
import { useStoreContext } from '@/utils/Globalstate';
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "@/utils/mutations";
import {useSession} from 'next-auth/react';

const SuccessComponent = () => {
    const [addOrder] = useMutation(ADD_ORDER);
    const [state, dispatch] = useStoreContext();
    const [purchasedFood,setPurchasedFood] = useState(null);
useEffect(() => {console.log(purchasedFood)},[purchasedFood])
    const loadLocalCart = async () => {
        const cartLoaded = await useLiveQuery(() =>  clientDatabase.cart.toArray(),[]);
         setPurchasedFood(cartLoaded);
    };
    loadLocalCart();
    

    return(
        purchasedFood &&  purchasedFood.map(meal => (
            <MenuItem key={meal._id} meal={meal} state={state}/>
        ))
    );
};

export default SuccessComponent;


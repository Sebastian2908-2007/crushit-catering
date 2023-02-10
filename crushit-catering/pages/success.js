import dynamic from "next/dynamic";
import clientDatabase from "@/utils/dexiedb";
import { useLiveQuery } from "dexie-react-hooks";
const SuccessComponent = dynamic(() =>import('@/components/SuccessComponent'),{ssr: false});

const Success = () => {
    console.log(
        'succes page rendering'
    )
    //clientDatabase.isDelivery.add({isDelivery:0});
     let purchasedFood;
     let shouldBeDelivered;
     //console.log(purchasedFood)
    
if(typeof window !== 'undefined') {
    purchasedFood = useLiveQuery(() => clientDatabase.cart.toArray(),[clientDatabase]);
    const pickUpDelivery = useLiveQuery(() =>  clientDatabase.isDelivery.toArray(),[]);
   // console.log('pd if BLOCK',pickUpDelivery[0].isDelivery);
   /* if(pickUpDelivery === 0) {
        shouldBeDelivered = false;
    }else{
        shouldBeDelivered = true;
    }*/
    shouldBeDelivered = pickUpDelivery
}
     
     
//console.log(purchasedFood);
console.log('IN SUCC PAGE',shouldBeDelivered);

    return(
        <section>
            <h1>Your Order has been placed successfully!</h1>
            { purchasedFood !==  undefined ? <SuccessComponent shouldBeDelivered={shouldBeDelivered} purchasedFood={purchasedFood} />: <div>NO SUCCESS COMP!</div> }
            <p>A conformation has been sent to your email</p>
        </section>
    );
};

export default Success;
/*  { purchasedFood !==  undefined ? <SuccessComponent shouldBeDelivered={shouldBeDelivered} purchasedFood={purchasedFood} />: <div>NO SUCCESS COMP!</div> } */
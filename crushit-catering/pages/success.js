import dynamic from "next/dynamic";
import clientDatabase from "@/utils/dexiedb";
import { useLiveQuery } from "dexie-react-hooks";
const SuccessComponent = dynamic(() =>import('@/components/SuccessComponent'),{ssr: false});

const Success = () => {
let purchasedFood;
let shouldBeDelivered;
if(typeof window !== 'undefined') {
    purchasedFood = useLiveQuery(() => clientDatabase.cart.toArray(),[clientDatabase]);
    const pickUpDelivery = useLiveQuery(() =>  clientDatabase.isDelivery.toArray(),[]);
    shouldBeDelivered = pickUpDelivery
}
    return(
        <section>
            <h1>Your Order has been placed successfully!</h1>
            { purchasedFood !==  undefined ? <SuccessComponent shouldBeDelivered={shouldBeDelivered} purchasedFood={purchasedFood} />: <div>NO SUCCESS COMP!</div> }
            <p>A conformation has been sent to your email</p>
        </section>
    );
};

export default Success;

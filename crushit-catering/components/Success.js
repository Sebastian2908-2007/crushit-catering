import clientDatabase from "@/utils/dexiedb";
import { useLiveQuery } from "dexie-react-hooks";
import SuccessComponent from "./SuccessComponent";
const Success = () => {
let purchasedFood;
let shouldBeDelivered;

    purchasedFood = useLiveQuery(() => clientDatabase.cart.toArray(),[clientDatabase]);
    const pickUpDelivery = useLiveQuery(() =>  clientDatabase.isDelivery.toArray(),[]);
    shouldBeDelivered = pickUpDelivery

    return(
        <section className="mt-8 md:w-full">
            <div className="flex flex-col justify-center">
            <h1 className="text-center">Your Order has been placed successfully!</h1>
            <p className="text-center">A conformation has been sent to your email</p>
            </div>
            { purchasedFood !==  undefined ? <SuccessComponent shouldBeDelivered={shouldBeDelivered} purchasedFood={purchasedFood} />: <div>NO SUCCESS COMP!</div> }
        </section>
    );
};

export default Success;

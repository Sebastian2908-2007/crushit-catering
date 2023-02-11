import clientDatabase from "@/utils/dexiedb";

const Success2 = () => {
    setTimeout(()=>{
clientDatabase.isDelivery.clear();
clientDatabase.cart.clear();
window.location.assign('/');
    },3000);
    return(
        <div>
            <span>Thank you come again</span>
        </div>
    );
};
export default Success2;
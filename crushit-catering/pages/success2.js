import clientDatabase from "@/utils/dexiedb";

const Success2 = () => {
    setTimeout(()=>{
clientDatabase.isDelivery.clear();
clientDatabase.cart.clear();
window.location.assign('/');
    },3000);
    return(
        <div className="mt-72 md:mt-80 lg:mt-72">
            <span className="text-2xl md:text-5xl lg:text-7xl drop-shadow-site-yellow">Thank you come again!</span>
        </div>
    );
};
export default Success2;
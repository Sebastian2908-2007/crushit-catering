import dynamic from "next/dynamic";
const SuccessComponent = dynamic(() =>import('@/components/SuccessComponent'),{ssr: false});

const Success = () => {
    return(
        <section>
            <h1>Your Order has been placed successfully!</h1>
            <SuccessComponent/> 
            <p>A conformation has been sent to your email</p>
        </section>
    );
};

export default Success;
/***/
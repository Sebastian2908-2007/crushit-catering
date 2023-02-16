import dynamic from "next/dynamic";
const Success = dynamic(() =>import('@/components/Success'),{ssr: false});

const Success1 = () => {
        return(
                <Success/>
        );
    };
    
    export default Success1;
import {GrClose} from 'react-icons/gr';
const CheckEmailModal = ({showCheckEmailModal,setShowCheckEmailModal}) => {
    return(
        <>
        {showCheckEmailModal && <div className="fixed inset-0 z-50 overflow-y-auto">
         <div
         className="fixed inset-0 w-full h-full bg-black opacity-40"
         onClick={() => setShowCheckEmailModal(false)}
         ></div>
         <div className="flex items-center min-h-screen px-4  py-8">
         <div className="
          relative
          w-full
          max-w-lg
          p-4
          mx-auto
          bg-site-yellow
          rounded-md
          shadow-lg
          border
          border-2
          border-white
         ">   
        <div
     onClick={() => setShowCheckEmailModal(false)}
     className="flex
      items-center
      justify-center
      flex-none
      w-12
      h-12
      bg-site-red
      rounded-full
      border
      border-2
      border-white
      text-2xl
      hover:bg-site-yellow
      hover:border-site-red
     ">
   <GrClose/>
    </div>
         <div className="mt-3 ">    
         <div className="mt-8 mb-8 text-center sm:ml-4 sm:text-left flex flex-col  items-center justify-center ">
             <span className="text-lg font-medium text-white shadow shadow-white p-1">
             Check your provided email to sign in!
             </span>
         </div>
         </div>
         </div>
         </div>
         </div>}
         </>
    );
};
export default CheckEmailModal;
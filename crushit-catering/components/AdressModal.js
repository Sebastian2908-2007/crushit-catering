const AddressModal = ({showAddressModal, setShowAddressModal}) => {
    return(
        <>
        {showAddressModal ? (
                <>
                    <div className="fixed inset-0 overflow-y-auto z-50">
                    <div
                            className=" overflow-auto
                             fixed
                             inset-0
                             w-full
                             h-full
                             bg-black
                             opacity-60
                             "
                             onClick={() => setShowAddressModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8 ">
                            <div className="relative
                             w-full
                             max-w-lg
                             mx-auto
                             bg-black
                             rounded-md
                             shadow-lg
                             p-6
                             ">
                               <form className="bg-site-yellow p-4 flex flex-col rounded border border-4 border-white ">
                                <label className="mt-4 text-center text-black">Street address</label>
                                <input placeholder="Street Address" className="mt-4 rounded text-black"/>
                                <label className="mt-4 text-center text-black">City</label>
                                <input placeholder="state" className="mt-4 rounded text-black"/>
                                <label className="mt-4 text-center text-black">State</label>
                                <input placeholder="zip" className="mt- rounded text-black"/>
                                <label className="mt-4 text-center text-black">Zip</label>
                                <input placeholder="country" className="mt-4 rounded text-black"/>
                                <label className="mt-4 text-center text-black">Country</label>
                                <input placeholder="Country" className="mt-4 rounded text-black"/>
                                <button className="bg-site-red mt-4 rounded p-2 border border-2 border-white">Checkout</button>
                               </form>
                             </div>
                        </div>
                     </div>
        </>
    ):null}
    </>
    )
};

export default AddressModal;
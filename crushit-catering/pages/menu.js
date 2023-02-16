import { useState } from 'react';
import { useStoreContext } from '@/utils/Globalstate';
import MenuItem from '@/components/MenuItem';
import NoDrinkModal from '@/components/NoDrinkModal';
const Menu = () => {
    const [state, dispatch] = useStoreContext();
    const {meals,drinks} = state;
    const[showNoDrinkModal,setShowNoDrinkModal]=useState(false);
    //console.log(drinks);
    //useEffect(() => {console.log(state.cart);},[state.cart]);
    return(
        <section className="w-full
         p-4
         grid
         grid-cols-1
         gap-4
         min-[540px]:grid-cols-2
         md:grid-cols-3
         lg:grid-cols-4
         lg:pt-12
         xl:pt-14
         2xl:pt-16
         "
        >
          <NoDrinkModal showNoDrinkModal={showNoDrinkModal}setShowNoDrinkModal={setShowNoDrinkModal} />
          {meals.map(meal => (
            <MenuItem 
            key={meal.main}
            meal={meal}
            drinks={drinks}
            dispatch={dispatch}
            state={state}
            setShowNoDrinkModal={setShowNoDrinkModal}
            />
          ))}
        </section>
    );
};
export default Menu;
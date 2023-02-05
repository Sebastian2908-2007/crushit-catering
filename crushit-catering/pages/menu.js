import { useEffect } from 'react';
import { useStoreContext } from '@/utils/Globalstate';
import MenuItem from '@/components/MenuItem';
const Menu = () => {
    const [state, dispatch] = useStoreContext();
    const {meals,drinks} = state;
    //console.log(drinks);
    useEffect(() => {console.log(state.cart);},[state.cart]);
    return(
        <section className="w-full p-8 grid grid-cols-1 gap-1">
          {meals.map(meal => (
            <MenuItem 
            key={meal._id}
            meal={meal}
            drinks={drinks}
            dispatch={dispatch}
            state={state}
            />
          ))}
        </section>
    );
};
export default Menu;
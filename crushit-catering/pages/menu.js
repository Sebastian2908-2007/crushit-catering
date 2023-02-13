import { useStoreContext } from '@/utils/Globalstate';
import MenuItem from '@/components/MenuItem';
const Menu = () => {
    const [state, dispatch] = useStoreContext();
    const {meals,drinks} = state;
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
         lg:pt-8
         "
        >
          {meals.map(meal => (
            <MenuItem 
            key={meal.main}
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
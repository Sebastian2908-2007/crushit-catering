import { useState } from 'react';
import {GiSodaCan} from 'react-icons/Gi'
const DrinkMenu = ({drinks,setChosenDrink}) => {
   // console.log(chosenDrink);
    //console.log(setChosenDrink);
    const [open, setOpen] = useState(false);
    return(
        <button
        onClick={() => setOpen(!open)}
        className="
         relative
         px-2
         py-1
         text-sm
         font-semibold
        leading-relaxed
         text-white
         transition-colors
         duration-150
         bg-site-red
         border
         border-site-yellow
         rounded-lg
          focus:outline-none
          hover:border-site-yellow
          focus:shadow-outline
          focus:border-site-yellow
         shrink
          w-32
          h-10
          mt-4
          z-10
         "
        role="navigation"
        aria-haspopup="true"
      >
        <div className="flex flex-row justify-center">
         
          <span className="px-2 text-site-yellow text-xl"><GiSodaCan/></span>
          <svg
            className="w-4 h-4 text-site-yellow fill-current "
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
        <ul
          className={`
          overflow-auto
           ${open ? 'h-40':'hidden'}
           left-0
           w-5/6
           p-1
           mt-3
           space-y-2
           text-sm
           bg-site-red
           border
           border-site-yellow
           rounded-lg
           shadow-lg
           `}
          aria-label="submenu"
        >
            {drinks.map(drink => (
                <li
                key={drink}
                className="
               
                 p-1
                 font-medium
                 text-site-yellow
                 transition-colors
                 duration-150
                 rounded-md hover:text-site-red
                 focus:outline-none
                 focus:shadow-outline
                 hover:bg-gray-100"                
                >
                <span onClick={() => {setChosenDrink(drink) ,setOpen(false)}}>{drink}</span>
                </li>
            ))
        
       }
        </ul>
      </button>
    );
};
export default DrinkMenu;
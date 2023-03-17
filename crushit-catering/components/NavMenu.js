import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
/**imports to use with next auth*/
import { useSession, signOut} from 'next-auth/react';
import {CgMenuRound} from 'react-icons/cg'
const NavMenu = () => {
  const [open, setOpen] = useState(false);
    const { data: session } = useSession()
    const { push } = useRouter()
	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })

		push(data.url)
	}

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
       border-[rgba(255,191,55,.8)]
       min-[360px]:border-2
       rounded-lg
      focus:outline-none
      hover:border-white
      focus:shadow-outline
      focus:border-site-yellow
       shrink
        w-20
        h-10
        m-[2%]
        z-30
        md:h-12
        xl:h-14
       "
      role="navigation"
      aria-haspopup="true"
    >
      <div className="flex flex-row">
       
        <span className="px-2 text-[rgba(255,191,55,.8)] text-xl hover:text-white"><CgMenuRound/></span>
        <svg
          className="w-4 h-4 text-[rgba(255,191,55,.8)] fill-current hover:text-white"
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
          ${open ? 'h-30':'hidden'}
         left-0
         w-auto
         p-1
         mt-6
         space-y-2
         text-sm
         bg-site-red
         border
         border-site-yellow
         rounded-lg
         shadow-lg
         xl:mt-8
         `}
        aria-label="submenu"
      >
        <li
          className="w-full
           p-1
           font-medium
           text-site-yellow
           transition-colors
           duration-150
           rounded-md
           hover:text-site-red
           focus:outline-none
           focus:shadow-outline
           hover:bg-gray-100"
          onClick={() => {setOpen(false)}}
        >
          <Link href='/menu'>food</Link>
        </li>
        <li
          className="w-full
           p-1
           font-medium
           text-site-yellow
           transition-colors
           duration-150
           rounded-md
           hover:text-site-red
           focus:outline-none
           focus:shadow-outline
           hover:bg-gray-100"
         onClick={() => {setOpen(false)}}
        >
          <Link href='/'>home</Link>
        </li>
        {session ?
         <li
         className="w-full p-1
          font-medium
          text-site-yellow 
          transition-colors
          duration-150
          rounded-md
          hover:text-site-red
         focus:outline-none 
         focus:shadow-outline 
         hover:bg-gray-100"
         onClick={() => {setOpen(false)}}
       >
        <span onClick={handleSignOut}>logout</span>
        </li>
        :
        <li
        className="
         w-full
         p-1
         font-medium
         text-site-yellow
         transition-colors
         duration-150
         rounded-md
         hover:text-site-red
         focus:outline-none
         focus:shadow-outline
         hover:bg-gray-100"
         onClick={() => {setOpen(false)}}
      >
        <Link href='/signin'>login</Link>
        </li>
        }
      </ul>
    </button>
    );
};

export default NavMenu;
/**
 * ul absolute 
 * a inline-block 
 */
import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import NavMenu from './NavMenu';
import dynamic from "next/dynamic";
const Cart = dynamic(() =>import( './Cart'),{ssr: false});
const AddressModal = dynamic(() =>import( './AdressModal'),{ssr: false});
//import AddressModal from './AdressModal';
//import Cart from './Cart';
import Image from 'next/image';
import {ImFacebook} from 'react-icons/im';
import {FiTwitter,FiInstagram} from 'react-icons/fi';

const Layout = ({ children }) => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [prevAddress,setPrevAddress] = useState({streetAddress:null,city:null,state:null,zip:null,country:null});
    //console.log(prevAddress);
return(
    <>
    <header className='flex
     flex-row
     justify-between
     items-center
     p-1
     shadow
     shadow-[rgba(255,191,55)]
     lg:shadow-2xl
     lg:shadow-[rgba(255,191,55)]'
    >
        <Link className='
         mt-[1%]
         h-[7vh]
         pl-[15%]
         relative
         min-[540px]:h-[10vh]
         lg:h-[18vh]
         2xl:h-[13vh]
         '
         href='/'>         
        <Image 
        src='/crushitcatering-logo.png'
        alt='crush it catering logo'
        sizes="(max-width: 2560px) 22vw,"
        fill
        />       
        </Link>
  <Cart setShowAddressModal={setShowAddressModal} setPrevAddress={setPrevAddress}/>
  <AddressModal showAddressModal={showAddressModal} setShowAddressModal={setShowAddressModal} prevAddress={prevAddress} setPrevAddress={setPrevAddress}/>
        <NavMenu/>
    </header>
    <main className={styles.main}>
        {children}
    </main>
    <footer className="bg-site-red p-3 pl-0 flex flex-row justify-between items-center">
    <div className='flex flex-row ml-1'>
            <Link href='/pp' className='
             pr-1
             text-site-yellow
             text-right
             w-[2.8rem]
             text-xs
             border-r-2
             border-site-yellow
             hover:text-white
            '>Privacy Policy</Link>
        <Link href='/tos' className='
         pl-1
         w-[2.8rem]
         text-site-yellow
         text-xs
         hover:text-white
        '>Service Terms</Link>
    </div>
    <span className='text-site-yellow text-xs'>&copy; CIC {new Date().getFullYear()}</span>
        <div className='w-24 text-site-yellow flex flex-row justify-between items-center'>
            {/*when first adding these external links an infinite refresh kept happenin i added  rel="noopener noreferrer"
            and the problem went away this was fast refresh in development */}
            <a className='hover:text-white' href='https://www.facebook.com/topdev11' target='_blank'  rel="noopener noreferrer">
            <ImFacebook/>
            </a>
            <a className='hover:text-white' href='https://www.instagram.com/topdev.tech/' target='_blank'  rel="noopener noreferrer">
            <FiInstagram/>
            </a>
            <a className='hover:text-white' href='https://twitter.com/topdev_tech' target='_blank'  rel="noopener noreferrer">
            <FiTwitter/>
            </a>
        </div>
    </footer>
    </>
);

};

export default Layout;
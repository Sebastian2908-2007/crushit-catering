import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import NavMenu from './NavMenu';
import Image from 'next/image';
import {FaCartArrowDown} from 'react-icons/fa'
import {ImFacebook} from 'react-icons/im';
import {FiTwitter,FiInstagram} from 'react-icons/fi';
const Layout = ({ children }) => {
return(
    <>
    <header className='flex flex-row justify-between p-2  shadow-2xl'>
        <Link className='mt-[1%]' href='/'>
        <Image 
        src='/crushitcatering-logo.png'
        alt='crush it catering logo'
        width={60}
        height={60}
        />
        </Link>
        <button className='text-site-yellow text-2xl'><FaCartArrowDown/></button>
        <NavMenu/>
    </header>
    <main className={styles.main}>
        {children}
    </main>
    <footer className="bg-site-red p-3 pl-0 flex flex-row justify-between items-center">
    <div className='flex flex-row ml-1'>
            <Link href='/pp' className='pr-1 text-site-yellow text-right w-[2.8rem] text-xs border-r-2 border-site-yellow'>Privacy Policy</Link>
        <Link href='/tos' className='pl-1 w-[2.8rem] text-site-yellow text-xs'>Service Terms</Link>
    </div>
    <span className='text-site-yellow text-xs'>&copy; CIC {new Date().getFullYear()}</span>
        <div className='w-24 text-site-yellow flex flex-row justify-between items-center'>
            {/*when first adding these external links an infinite refresh kept happenin i added  rel="noopener noreferrer"
            and the problem went away this was fast refresh in development */}
            <a href='https://www.facebook.com/topdev11' target='_blank'  rel="noopener noreferrer">
            <ImFacebook/>
            </a>
            <a href='https://www.instagram.com/topdev.tech/' target='_blank'  rel="noopener noreferrer">
            <FiInstagram/>
            </a>
            <a href='https://twitter.com/topdev_tech' target='_blank'  rel="noopener noreferrer">
            <FiTwitter/>
            </a>
        </div>
    </footer>
    </>
);

};

export default Layout;
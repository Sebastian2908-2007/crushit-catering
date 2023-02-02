import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import NavMenu from './NavMenu';
import Image from 'next/image';
import {FaCartArrowDown} from 'react-icons/fa'
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
    <footer>This is the footer</footer>
    </>
);

};

export default Layout;
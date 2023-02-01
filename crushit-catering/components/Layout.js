import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import NavMenu from './NavMenu';
const Layout = ({ children }) => {
return(
    <>
    <header className='flex flex-row justify-between p-2'>
        <span>CrushIt Catering</span>
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
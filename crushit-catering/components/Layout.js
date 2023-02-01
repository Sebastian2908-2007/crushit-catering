import { useRouter } from 'next/router';
/**imports to use with next auth*/
import { useSession, signOut} from 'next-auth/react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
const Layout = ({ children }) => {
    const { data: session } = useSession()
    const { push } = useRouter()
	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })

		push(data.url)
	}

return(
    <>
    <header><span>CrushIt Catering</span>{session ? <button onClick={handleSignOut}>sign out</button>:<Link href='/signin'>Signin</Link>}</header>
    <main className={styles.main}>
        {children}
    </main>
    <footer>This is the footer</footer>
    </>
);

};

export default Layout;
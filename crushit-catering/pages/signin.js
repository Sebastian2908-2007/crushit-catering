import { useState } from 'react';
import { useRouter } from 'next/router';
/**imports to use with next auth*/
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '@/styles/Home.module.css';

const Signin = () => {
    return(
        <main className={styles.main}>
        <form className='
         flex flex-col
         border-8 rounded-md
         border-[rgb(127,255,0)]
         sm:border-[#880808]
         p-[20%]
         w-full
         '
         
         >
            <input  name="email"/>
            <button type='submit'>Sign in</button>
        </form>
        </main>
    );
};

export default Signin;
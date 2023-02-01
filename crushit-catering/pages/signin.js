import { useState } from 'react';
import { useRouter } from 'next/router';
/**imports to use with next auth*/
import { useSession, signIn} from 'next-auth/react';
import styles from '@/styles/Home.module.css';
import {BsTwitter,BsGoogle} from 'react-icons/bs';

/**these will have the name and provider of which to log in with*/

const providers = [
	{
		name: 'twitter',
		Icon: BsTwitter,
	},
	{
		name: 'google',
		Icon: BsGoogle,
	},
]

const Signin = () => {

    const { data: session, status } = useSession()
	const { push } = useRouter()
	const [email, setEmail] = useState('')

	console.log(session)
	if (status === 'loading') return <h1>Checking Authentication...</h1>

	if (session) {
		setTimeout(() => {
			push('/')
		}, 5000)

		return <h1>you are already signed in</h1>
	}

    /**below function will help us sign in with things like twitter etc */
	const handleOAuthSignIn = (provider) => () => signIn(provider)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!email) return false

		signIn('email', { email, redirect: false })
	}

    return(
        <main className={styles.main}>
        <form onSubmit={handleSubmit}
        className='
         flex flex-col
         border-8 rounded-md
         border-[rgb(127,255,0)]
         sm:border-[#880808]
         p-[20%]
         w-full
         '
         
         >
            <input  name="email" onChange={(e) => setEmail(e.target.value)}/>
            <button type='submit'>Sign in</button>
        </form>
        <div>
        {providers.map(({ name, Icon }) => (
					<button
						key={name}
						onClick={handleOAuthSignIn(name)}
					>
						<Icon /> Sign in with {name}
					</button>
				))}
        </div>
        </main>
    );
};

export default Signin;
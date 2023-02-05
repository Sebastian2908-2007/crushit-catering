import { useState } from 'react';
import { useRouter } from 'next/router';
/**imports to use with next auth*/
import { useSession, signIn} from 'next-auth/react';
import {BsTwitter,BsGoogle} from 'react-icons/bs';
import {TfiEmail} from 'react-icons/Tfi';

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

		<section className="
		 mt-[30%]
		 flex
		 flex-col
		 items-center
		 justify-center
		 content-center
		 justify-items-center">
		<form onSubmit={handleSubmit}
		className='
		flex flex-col
		w-full
		mb-6
		border
		border-4
		border-white
		p-4
		rounded
		'
		
		>
			<label className="w-full text-center text-white">Sign in with email</label>
			<input  name="email" placeholder="enter email to sign in" onChange={(e) => setEmail(e.target.value)}/>
			<button className="
			border
			flex
			flex-row
			justify-center
			mt-4 
			rounded 
			
			p-2.5
			hover:border-site-red 
			hover:bg-site-yellow 
			hover:text-site-red
			type=submit"
			>
				<TfiEmail color="black"/>
			  <span className="ml-[3rem]">Submit email</span>  
			</button>
		</form>
		<div className="flex flex-col">
		{providers.map(({ name, Icon }) => (
					<button className="flex
					 flex-row
					 justify-center
					 w-full
					 mt-2
					 p-2.5
					 flex-1
					 rounded-md
					 outline-none
					 border
					 ring-offset-2
					 ring-indigo-600
					 focus:ring-2
					 hover:border-site-red 
					 hover:bg-site-yellow 
					 hover:text-site-red
					 "
						key={name}
						onClick={handleOAuthSignIn(name)}
					>
						<Icon color={name === 'twitter' ? '#1DA1F2':'rgba(218 ,41 ,28)'}/>
						<span className="ml-2">Sign in with {name}</span> 
					</button>
				))}
							 <button
			className="w-full mt-2 p-2.5 flex-1 text-site-yellow bg-site-red rounded-md outline-none border  ring-offset-2 ring-indigo-600 focus:ring-2"
			onClick={() =>
				setShowModal(false)
			}
		>
			Cancel
		</button>
		</div>
	</section>
		
    );
};

export default Signin;
        /*<section>
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
        </section>*/
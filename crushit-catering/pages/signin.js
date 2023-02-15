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
		 min-[412px]:mt-[35%]
		 lg:mt-[15%]
		 flex
		 flex-col
		 items-center
		 justify-center
		 content-center
		 justify-items-center
		 w-[85%]
		 min-[412px]:w-[65%]
		 md:w-[45%]
		 lg:w-[35%]
		 xl:w-[30%]
		 2xl:w-[20%]
		 ">
		<form onSubmit={handleSubmit}
		className='
		flex
		flex-col
		justify-between
		w-full
		mb-6
		border		
		border-site-yellow
		p-4
		rounded
		h-[30vh]
		min-[412px]:h-[25vh]
		md:h-[20vh]
		lg:h-[33vh]
		2xl:h-[18vh]
		xl:items-center
		'		
		>
			<label className="
			 w-full
			 text-center
			 text-white
			 drop-shadow-site-yellow
			">Sign in with email</label>
			<input className='xl:w-[60%]'  name="email" placeholder="enter email to sign in" onChange={(e) => setEmail(e.target.value)}/>
			<button className="
			border
			border-site-yellow
			flex
			flex-row
			justify-center
			mt-4 
			rounded 			
			p-2.5
			hover:border-white 
			hover:bg-site-yellow 
			hover:text-site-red
			xl:w-[60%]
			"
			type='submit'
			>
				<TfiEmail color="black"/>
			  <span className="ml-[3rem] drop-shadow-site-yellow">Submit email</span>  
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
					 border-site-yellow
					 ring-offset-2
					 ring-indigo-600
					 focus:ring-2
					 hover:border-site-red 
					 hover:bg-white 
					 hover:text-site-red
					 "
						key={name}
						onClick={handleOAuthSignIn(name)}
					>
						<Icon color={name === 'twitter' ? '#1DA1F2':'rgba(218 ,41 ,28)'}/>
						<span className="ml-2 drop-shadow-site-yellow">Sign in with {name}</span> 
					</button>
				))}
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
import { useState } from "react";
import { useRouter } from 'next/router';
/**imports to use with next auth*/
import { useSession, signIn} from 'next-auth/react';
import {BsTwitter,BsGoogle} from 'react-icons/bs';
import {TfiEmail} from 'react-icons/Tfi'


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


export default function SigninModal() {
    const [showModal, setShowModal] = useState(false);
    const { data: session, status } = useSession();
    const [email, setEmail] = useState('');
    const { push } = useRouter();
    /**checks to see if there is a session i.e. user is logged in*/
    const shouldSignIn = () => {
       if(!session) {
        setShowModal(true);
       }else{
       push('/menu');
       }
    };

    /**below function will help us sign in with things like twitter etc */
	const handleOAuthSignIn = (provider) => () => signIn(provider)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!email) return false

		signIn('email', { email, redirect: false })
	}

	if (status === 'loading') return <h1>Checking Authentication...</h1>
    return (
        <>
          
                <button 
        type="button"
        onClick={shouldSignIn}
        className='
       mt-4
       p-2
       font-semibold
       sticky
       top-0 
       border-2 
       hover:border-white
       hover:bg-site-yellow
       hover:text-white
       rounded-lg
       border-white    
       text-site-yellow
       bg-site-red
       z-50
       '>
        Menu
      </button>

            
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8 ">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-site-yellow rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left flex flex-col  items-center justify-center ">
                                    <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Sign in to Order Or schedual event
                                        </h4>
                                        <p className="mt-2 text-[15px] text-center leading-relaxed text-black">
                                         Signing in is important so that we can send you emails pertaining to your order. Such as reciept's and updates.
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                        <section className="flex flex-col items-center justify-center content-center justify-items-center">
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
                                                bg-site-yellow 
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
import Head from 'next/head';
import Image from 'next/image';
import { useStoreContext } from '@/utils/Globalstate';
import heroPic from '../public/cic-home-hero.png'
const imgStyle = {
  objectFit:'contain',
  width:'100%',
  //height: '10vh'
}

export default function Home() {
  const [state, dispatch] = useStoreContext();
  console.log(state);
  return (
    <>
      <Head>
        <title>CrushIt Catering</title>
        <meta name="description" content="A Web app dedicated to catering and online food delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='w-full relative '>
        <div className='md:w-full h-[40vh] md:h-[33vh] lg:h-[80vh]'>
        <Image
        src={heroPic}
        alt='some really nice nachos that will make you very hungry'
        //style={imgStyle}
        fill
        />
        </div>
      </section>

      <button className='
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

      <section className='w-full p-4'>
      <div className='
      w-full border-2
       border-white
       rounded-lg
       flex
       flex-col
       items-center
       shadow-lg
       shadow-site-red
       '>

        <h1 className='text-center
         mt-4
         mb-2
         pb-2
         text-white
         border-b-2
         border-white
         w-48
         font-bold
         text-2xl
         drop-shadow-site-yellow 
        '>
          Crush it Catering
        </h1>

        <h2 className='text-center
         font-semibold
         mt-6
         drop-shadow-site-yellow 
         '
        >
          About us
        </h2>
        <div className='p-4'>
        <p className='mt-2  drop-shadow-black text-center'>
        "Welcome to Crush It Catering, a family-owned and operated business serving the community for over 40 years.
        </p>
        <p className='mt-2 drop-shadow-black text-center'>
         Our passion for authentic Mexican cuisine is reflected in every dish we prepare, using only the freshest ingredients and traditional cooking methods.
         </p>
<p className='mt-2 drop-shadow-black text-center'>
Our menu features a wide range of mouth-watering options, from classic tacos and burritos to specialty plates and catering platters.
</p>
<p className='mt-2 drop-shadow-black text-center'>
 We take pride in our ability to accommodate any dietary restrictions, offering vegetarian, vegan, and gluten-free options.
 </p>
 <p className='mt-2 drop-shadow-black text-center'>

As a family business, we understand the importance of bringing people together over a delicious meal.
</p>
<p className='mt-2 drop-shadow-black text-center'>
 That's why we offer convenient delivery and catering services, making it easy to enjoy our delicious food in the comfort of your own home or at your next event.
 </p>
<p className='mt-2 drop-shadow-black text-center'>
At Crush It Catering, we strive to not only satisfy your taste buds but also provide a warm and welcoming atmosphere for our customers. 
</p>
<p className='mt-2 drop-shadow-black text-center'>
We are grateful for the support we have received from the community over the years and look
 forward to continuing to serve you for many more to come.
 </p>
<p className='mt-2 drop-shadow-black text-center'>
So whether you're in the mood for a quick lunch or planning a large gathering, Crush It Catering is the perfect choice for all your Mexican food cravings. Order now and taste the difference that 40 years of experience can make."
</p>       
        </div>
      </div>
      </section>
      
        
    </>
  )
}

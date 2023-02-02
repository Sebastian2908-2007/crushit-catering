import Head from 'next/head';
import Image from 'next/image';
import { useStoreContext } from '@/utils/Globalstate';
import heroPic from '../public/cic-home-hero.png'

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
      <section className='w-full'>
        <Image
        src={heroPic}
        alt='some really nice nachos that will make you very hungry'
        />
      </section>
      <section className='w-full p-4'>
      <div className='w-full border-4 border-site-red rounded flex flex-col items-center shadow-lg shadow-site-red'>
        <h1 className='text-center mb-2 text-white border-b-2 border-white w-40 font-bold'>Crush it Catering</h1>
        <h2 className='text-center font-semibold'>About us</h2>
        <div className='p-4'>
        <p className='mt-2'>
        "Welcome to Crush It Catering, a family-owned and operated business serving the community for over 40 years.
        </p>
        <p className='mt-2'>
         Our passion for authentic Mexican cuisine is reflected in every dish we prepare, using only the freshest ingredients and traditional cooking methods.
         </p>
<p className='mt-2'>
Our menu features a wide range of mouth-watering options, from classic tacos and burritos to specialty plates and catering platters.
</p>
<p className='mt-2'>
 We take pride in our ability to accommodate any dietary restrictions, offering vegetarian, vegan, and gluten-free options.
 </p>
 <p className='mt-2'>

As a family business, we understand the importance of bringing people together over a delicious meal.
</p>
<p className='mt-2'>
 That's why we offer convenient delivery and catering services, making it easy to enjoy our delicious food in the comfort of your own home or at your next event.
 </p>
<p className='mt-2'>
At Crush It Catering, we strive to not only satisfy your taste buds but also provide a warm and welcoming atmosphere for our customers. 
</p>
<p className='mt-2'>
We are grateful for the support we have received from the community over the years and look
 forward to continuing to serve you for many more to come.
 </p>
<p className='mt-2'>
So whether you're in the mood for a quick lunch or planning a large gathering, Crust It Catering is the perfect choice for all your Mexican food cravings. Order now and taste the difference that 40 years of experience can make."
</p>       
        </div>
      </div>
      </section>
      
        
    </>
  )
}

import Head from 'next/head';
import Image from 'next/image';
import heroPic from '../public/cic-home-hero.png'
import displayPic1 from '../public/cic-display-pic (1).png'
import displayPic2 from '../public/cic-display-pic (2).png'
import displayPic3 from '../public/cic-display-pic (3).png'
import displayPic4 from '../public/cic-display-pic (4).png'
import displayPic5 from '../public/cic-display-pic (5).png'
import SigninModal from '@/components/SigninModal';


export default function Home() {

  return (
    <>
      <Head>
        <title>CrushIt Catering</title>
        <meta name="description" content="A Web app dedicated to catering and online food delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='
       lg:mt-8
       w-full
       lg:w-4/5
       xl:w-[85%]
       2xl:w-[95%]
       2xl:mt-[3%]
       lg:shadow-lg
       lg:shadow-site-yellow
       relative
       '>
        <div className='
         md:w-full
         h-[40vh]
         md:h-[50vh]
         lg:h-[80vh]
        
         2xl:h-[85vh]
        '>
        <Image
        src={heroPic}
        alt='some really nice nachos that will make you very hungry'
        fill
        />
        </div>
      </section>

      <SigninModal/>
  

      <section className='w-full xl:w-[98%] 2xl:w-[78%] p-4'>
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
         md:text-3xl
         md:w-64
         drop-shadow-site-yellow 
        '>
          Crush it Catering
        </h1>

        <h2 className='
         text-center
         font-semibold
         mt-6
         drop-shadow-site-yellow 
         md:text-2xl
         '
        >
          About us
        </h2>
        <div className='p-4 sm:flex sm:flex-col sm:items-center'>
        <p className='mt-2 drop-shadow-black text-center lg:text-lg'>
        "Welcome to Crush It Catering, a family-owned and operated business serving the community for over 40 years.
        </p>
        <p className='mt-2 drop-shadow-black text-center lg:text-lg'>
         Our passion for authentic Mexican cuisine is reflected in every dish we prepare, using only the freshest ingredients and traditional cooking methods.
         </p>
  <div className='relative h-48 mt-4 mb-4 sm:h-80 sm:w-4/5 xl:w-2/3 xl:h-96 2xl:h-[34rem]'>
  <Image
  src={displayPic1}
  alt=""
  fill
  className='rounded'
  />
</div>
<p className='mt-2 drop-shadow-black text-center lg:text-lg'>
Our menu features a wide range of mouth-watering options, from classic tacos and burritos to specialty plates and catering platters.
</p>

<p className='mt-2 drop-shadow-black text-center lg:text-lg'>
 We take pride in our ability to accommodate any dietary restrictions, offering vegetarian, vegan, and gluten-free options.
 </p>
 <p className='mt-2 drop-shadow-black text-center lg:text-lg'>

As a family business, we understand the importance of bringing people together over a delicious meal.
</p>
<div className='relative h-48 mt-4 mb-4 sm:h-80 sm:w-4/5 xl:w-2/3 xl:h-96 2xl:h-[34rem]'>
  <Image
  src={displayPic2}
  alt=""
  fill
  className='rounded'
  />
</div>
<p className='mt-2 drop-shadow-black text-center lg:text-lg'>
 That's why we offer convenient delivery and catering services, making it easy to enjoy our delicious food in the comfort of your own home or at your next event.
 </p>

<p className='mt-2 drop-shadow-black text-center lg:text-lg'>
At Crush It Catering, we strive to not only satisfy your taste buds but also provide a warm and welcoming atmosphere for our customers. 
</p>
<div className='relative h-48 mt-4 mb-4 sm:h-80 sm:w-4/5 xl:w-2/3 xl:h-96 2xl:h-[34rem]'>
  <Image
  src={displayPic3}
  alt=""
  fill
  className='rounded'
  />
</div>
<p className='mt-2 drop-shadow-black text-center lg:text-lg'>
We are grateful for the support we have received from the community over the years and look
 forward to continuing to serve you for many more to come.
 </p>
 <div className='relative h-48 mt-4 mb-4 sm:h-80 sm:w-4/5 xl:w-2/3 xl:h-96 2xl:h-[34rem]'>
  <Image
  src={displayPic4}
  alt=""
  fill
  className='rounded'
  />
</div>
<p className='mt-2 drop-shadow-black text-center lg:text-lg'>
So whether you're in the mood for a quick lunch or planning a large gathering, Crush It Catering is the perfect choice for all your Mexican food cravings. Order now and taste the difference that 40 years of experience can make."
</p>
<div className='relative h-48 mt-4 mb-4 sm:h-80 sm:w-4/5 xl:w-2/3 xl:h-96 2xl:h-[34rem]'>
  <Image
  src={displayPic5}
  alt=""
  fill
  className='rounded'
  />
</div>       
        </div>
      </div>
      </section>
      
        
    </>
  )
}

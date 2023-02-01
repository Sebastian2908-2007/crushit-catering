import Head from 'next/head';
import { useStoreContext } from '@/utils/Globalstate';

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
        <h1>Home Crushit Catering</h1>
    </>
  )
}

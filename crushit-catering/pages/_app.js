/**this provider allows use to authenticate with email google,twitter*/
import { SessionProvider } from 'next-auth/react';
/**this is our import for the global state*/
import { StoreProvider } from '@/utils/Globalstate';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
<SessionProvider session={session}>
  <StoreProvider>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </StoreProvider>
</SessionProvider>
  );
}

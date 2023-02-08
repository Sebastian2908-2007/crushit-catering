/**this provider allows use to authenticate with email google,twitter*/
import { SessionProvider } from 'next-auth/react';
/**this is our import for the global state*/
import { StoreProvider } from '@/utils/Globalstate';
import Layout from '@/components/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apolloClient';
import '@/styles/globals.css';

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  const apolloClient = useApollo(pageProps);
  return (
<SessionProvider session={session}>
<ApolloProvider client={apolloClient}> 
  <StoreProvider>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </StoreProvider>
  </ApolloProvider>
</SessionProvider>
  );
}

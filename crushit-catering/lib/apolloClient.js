import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';


export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

/**stuff below is what we would regularly build a client with */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
});

/**paths need to be absolute so using a proxy like in react wont work It should be easy to get absolute
 * path once starting the app in production though ffrom my logs in the server.js file so then I can edit it here
 */
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_URI, // Server URL (must be absolute)
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
});
/*const schemaLink = new SchemaLink({schema});*/

/*const authLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
   }
   ,authLink
});*/
  


function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink,httpLink]) ,
    cache: new InMemoryCache()
  })
};
/**stuff above is what we would regularly build a client with */

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  };
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

/**This would be used for static site generation "getStaticProps()" or server side rendering 
 * it can be used with "getServerSideProps()" passing to it the initializeApollo function and any props
*/
export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  };

  return pageProps;
};

/**this function is used in the _app.js file and fed to the Apolloprovider that wraps everything else */
export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
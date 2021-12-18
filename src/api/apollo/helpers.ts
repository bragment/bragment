import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCurrentUser } from '../parse';

export function createApolloClient() {
  const uri = process.env.GRAPHQL_URL;
  const appId = process.env.APP_ID;
  const httpLink = createHttpLink({ uri });
  const authLink = setContext((_, { headers }) => {
    const token = getCurrentUser()?.getSessionToken();
    return {
      headers: {
        ...headers,
        'X-Parse-Application-Id': appId,
        'X-Parse-Session-Token': token,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

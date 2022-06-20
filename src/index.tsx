import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createApolloClient } from './api/apollo';
import { initializeParse } from './api/parse';
import { initializeSentry } from './api/sentry';
import App from './components/App';
import { createQueryClient } from './libs/react-query';
import reportWebVitals from './reportWebVitals';
import stores, { AppContext } from './stores';
import { initializeStores } from './stores/helpers';

import './styles/index.scss';

initializeSentry();
initializeParse();
initializeStores();
const apolloClient = createApolloClient();

const queryClient = createQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppContext.Provider value={stores}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <App />
          <ReactQueryDevtools />
        </ApolloProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  </StrictMode>
);

setTimeout(() => {
  const overture = document.getElementById('overture');
  overture?.classList.add('loaded');
  overture?.remove();
  // setTimeout(() => {
  //   overture?.remove();
  // }, 1000);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

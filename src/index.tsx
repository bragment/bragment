import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createApolloClient } from './api/apollo';
import { initializeParse } from './api/parse';
import { initializeSentry } from './api/sentry';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import stores, { AppContext } from './stores';
import { initializeStores } from './stores/helpers';
import './styles/index.scss';

initializeSentry();
initializeParse();
initializeStores();
const client = createApolloClient();

ReactDOM.render(
  <StrictMode>
    <AppContext.Provider value={stores}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AppContext.Provider>
  </StrictMode>,
  document.getElementById('root'),
  () => {
    const overture = document.getElementById('overture');
    overture?.classList.add('loaded');
    overture?.remove();
    // setTimeout(() => {
    //   overture?.remove();
    // }, 1000);
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

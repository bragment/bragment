import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import stores, { AppContext } from './stores';

import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const handleAppMount = () => {
  const overture = document.getElementById('overture');
  setTimeout(() => {
    overture?.classList.add('loaded');
    setTimeout(() => {
      overture?.remove();
    }, 600);
  }, 2100);
};

root.render(
  <StrictMode>
    <AppContext.Provider value={stores}>
      <App onMount={handleAppMount} />
    </AppContext.Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

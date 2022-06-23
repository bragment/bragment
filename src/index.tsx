import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import stores, { AppContext } from './stores';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const handleAppMount = () => {
  const overture = document.getElementById('overture');
  setTimeout(() => {
    overture?.classList.add('loaded');
  }, 2000);
  setTimeout(() => {
    overture?.remove();
  }, 4000);
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

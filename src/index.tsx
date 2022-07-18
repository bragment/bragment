import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainRouter from './routes/MainRouter';

import './styles/index.scss';
import { checkIfSafari } from './utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const handleAppMount = () => {
  const overture = document.getElementById('overture');
  if (process.env.NODE_ENV === 'development') {
    overture?.remove();
  }
  setTimeout(() => {
    overture?.classList.add('loaded');
    setTimeout(() => {
      overture?.remove();
    }, 600);
  }, 2100);
};

if (checkIfSafari()) {
  document.body.classList.add('safari');
}

root.render(
  <StrictMode>
    <App onMount={handleAppMount}>
      <MainRouter />
    </App>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

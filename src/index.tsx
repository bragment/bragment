import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeSentry } from './libs/sentry';
import { sendToVercelAnalytics } from './libs/vercel/vitals';
import reportWebVitals from './reportWebVitals';
import MainRouter from './routes/MainRouter';
import './styles/index.scss';
import { checkIfSafari } from './utils';

initializeSentry();

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
  }, 900);
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

reportWebVitals(sendToVercelAnalytics);

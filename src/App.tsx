import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useSettingStore } from './components/hooks';
import { createQueryClient } from './libs/react-query';
import stores, { AppContext } from './stores';

interface IAppProps {
  children: React.ReactNode;
  onMount?: () => void;
}

function App(props: IAppProps) {
  const { children, onMount } = props;
  const { language, localMessages } = useSettingStore();
  const queryClient = useMemo(() => createQueryClient(), []);

  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <AppContext.Provider value={stores}>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale={language} messages={localMessages}>
          {children}
        </IntlProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default observer(App);

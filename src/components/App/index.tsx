import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useSettingStore } from '../hooks';
import RootRouter from '../RootRouter';

interface IAppProps {
  onMount?: () => void;
}

function App(props: IAppProps) {
  const { onMount } = props;
  const { language, localMessages } = useSettingStore();

  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <IntlProvider locale={language} messages={localMessages}>
      <RootRouter />
    </IntlProvider>
  );
}

export default observer(App);

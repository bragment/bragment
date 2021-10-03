import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import DialogContainer from '../DialogContainer';
import { useSettingStore } from '../hooks';
import UserAvatar from '../UserAvatar';
import styles from './index.module.scss';

const { Content } = Layout;
function App() {
  const { language, localMessages } = useSettingStore();

  return (
    <IntlProvider locale={language} messages={localMessages}>
      <Layout className={styles.layout}>
        <Content>
          <UserAvatar />
          <DialogContainer />
        </Content>
      </Layout>
    </IntlProvider>
  );
}

export default observer(App);

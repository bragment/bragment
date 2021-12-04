import { Layout } from 'antd';
import { memo } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import SettingPage from '../../pages/SettingPage';
import { ERoutePath } from '../../stores/types';
import DialogContainer from '../DialogContainer';
import Header from '../Header';
import Navigator from '../Navigator';
import AnimatedSwitch from './AnimatedSwitch';
import styles from './index.module.scss';

const { Content } = Layout;
function Router() {
  return (
    <HashRouter>
      <Layout hasSider className={styles.layout}>
        <Navigator />
        <Layout className={styles.main}>
          <Header />
          <Content>
            <AnimatedSwitch>
              <Route path={ERoutePath.HOME}>
                <AnimatedSwitch>
                  <Route
                    exact
                    path={ERoutePath.SETTING}
                    component={SettingPage}
                  />
                  <Route exact path={[ERoutePath.HOME]} component={HomePage} />
                </AnimatedSwitch>
              </Route>
            </AnimatedSwitch>
          </Content>
        </Layout>
        <DialogContainer />
      </Layout>
    </HashRouter>
  );
}

export default memo(Router);

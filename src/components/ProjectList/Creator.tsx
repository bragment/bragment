import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card as AntCard } from 'antd';
import { observer } from 'mobx-react';
import { ESignInDialogTabKey } from '../../stores/types';
import {
  useDialogStore,
  useFormatMessage,
  useProjectStore,
  useUserStore,
} from '../hooks';
import styles from './index.module.scss';

function ProjectCreator() {
  const f = useFormatMessage();
  const { setCreateProjectDialogVisible, setSignInDialogVisible } =
    useDialogStore();
  const { loading } = useProjectStore();
  const { signedIn } = useUserStore();

  const handleClick = () => {
    if (loading) {
      // NOTE: do nothing
    } else if (signedIn) {
      setCreateProjectDialogVisible(true);
    } else {
      setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_IN);
    }
  };
  return (
    <AntCard
      className={styles.creator}
      bordered={false}
      hoverable
      onClick={handleClick}>
      <p className={styles.title}>
        {loading ? (
          <>
            <LoadingOutlined />
            {f('loading')}
          </>
        ) : (
          <>
            <PlusOutlined />
            {f('createNewProject')}
          </>
        )}
      </p>
    </AntCard>
  );
}

export default observer(ProjectCreator);

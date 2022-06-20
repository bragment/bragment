import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { ESignInDialogTabKey } from '../../stores/types';
import { ETitleMode } from '../BoardView/types';
import { useDialogStore, useUserStore } from '../hooks';
import CreateWorkspaceForm from './CreateWorkspaceForm';
import styles from './index.module.scss';

function ProjectCreator() {
  const [mode, setMode] = useState(ETitleMode.Text);
  const { signedIn } = useUserStore();
  const { setSignInDialogVisible } = useDialogStore();

  const handleTextClick = () => {
    if (signedIn) {
      setMode(ETitleMode.Form);
    } else {
      setSignInDialogVisible(true, ESignInDialogTabKey.SignIn);
    }
  };
  const handleFormFinish = () => {
    setMode(ETitleMode.Text);
  };

  return (
    <div className={styles.creatorWrapper}>
      {mode === ETitleMode.Text && (
        <p className={styles.title} onClick={handleTextClick}>
          <PlusOutlined />
          add workspace
        </p>
      )}
      {mode === ETitleMode.Form && (
        <CreateWorkspaceForm
          onCancel={handleFormFinish}
          onFinish={handleFormFinish}
        />
      )}
    </div>
  );
}

export default observer(ProjectCreator);

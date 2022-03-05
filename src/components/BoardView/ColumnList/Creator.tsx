import { PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { memo, useLayoutEffect, useRef, useState } from 'react';
import { ESignInDialogTabKey } from '../../../stores/types';
import {
  useDialogStore,
  useFormatMessage,
  useProjectStore,
  useUserStore,
} from '../../hooks';
import { ETitleMode } from '../types';
import CreateColumnForm from './CreateColumnForm';
import styles from './Column/index.module.scss';

export interface IColumnCreatorProps {
  viewId: string;
}

function ColumnCreator(props: IColumnCreatorProps) {
  const { viewId } = props;
  const [mode, setMode] = useState(ETitleMode.Text);
  const selfRef = useRef<HTMLDivElement>(null);
  const f = useFormatMessage();
  const { current } = useProjectStore();
  const { signedIn } = useUserStore();
  const { setSignInDialogVisible } = useDialogStore();
  const projectId = current?.objectId || '';

  const handleTextClick = () => {
    if (signedIn) {
      setMode(ETitleMode.Form);
    } else {
      setSignInDialogVisible(true, ESignInDialogTabKey.SignIn);
    }
  };

  const handleCancel = () => {
    setMode(ETitleMode.Text);
  };

  const handleFinish = () => {
    setMode(ETitleMode.Text);
  };

  useLayoutEffect(() => {
    if (mode === ETitleMode.Form) {
      const handleBodyMouseDown = (event: MouseEvent) => {
        if (
          event.target instanceof Node &&
          selfRef.current?.contains(event.target)
        ) {
          return;
        }
        setMode(ETitleMode.Text);
      };
      document.body.addEventListener('mousedown', handleBodyMouseDown);
      return () => {
        document.body.removeEventListener('mousedown', handleBodyMouseDown);
      };
    }
  }, [mode]);

  return (
    <div
      ref={selfRef}
      className={classnames(
        styles.creator,
        mode === ETitleMode.Form && styles.formMode,
        mode === ETitleMode.Text && styles.textMode
      )}>
      {mode === ETitleMode.Text && (
        <div className={styles.text} onClick={handleTextClick}>
          <>
            <PlusOutlined />
            {f('addAnotherColumn')}
          </>
        </div>
      )}
      {mode === ETitleMode.Form && (
        <CreateColumnForm
          projectId={projectId}
          viewId={viewId}
          onCancel={handleCancel}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}

export default memo(ColumnCreator);

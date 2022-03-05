import { PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { memo, useLayoutEffect, useRef, useState } from 'react';

import { useFormatMessage, useProjectStore } from '../../../hooks';
import { ETitleMode } from '../../types';
import CreateCardForm from './CreateCardForm';
import styles from './index.module.scss';

interface IColumnFooterProps {
  objectId: string;
  onHeightChange?: (height?: number) => void;
}

function ColumnFooter(props: IColumnFooterProps) {
  const { objectId, onHeightChange } = props;
  const f = useFormatMessage();
  const { current } = useProjectStore();
  const [mode, setMode] = useState(ETitleMode.Text);
  const selfRef = useRef<HTMLDivElement>(null);
  const projectId = current?.objectId || '';

  const handleTextClick = () => {
    setMode(ETitleMode.Form);
  };

  const handleCancel = () => {
    setMode(ETitleMode.Text);
  };

  const handleFinish = () => {
    setMode(ETitleMode.Text);
  };

  const handleHeightChange = (formHeight: number) => {
    if (onHeightChange) {
      // NOTE: footerHeight = formHeight + 16
      onHeightChange(formHeight + 16);
    }
  };

  useLayoutEffect(() => {
    if (onHeightChange) {
      onHeightChange(selfRef.current?.clientHeight);
    }
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
  }, [mode, onHeightChange]);

  return (
    <div ref={selfRef} className={styles.footer}>
      <div
        className={classnames(
          styles.creator,
          mode === ETitleMode.Text ? styles.textMode : styles.formMode
        )}>
        {mode === ETitleMode.Text && (
          <div className={styles.text} onClick={handleTextClick}>
            <PlusOutlined />
            {f('addAnotherCard')}
          </div>
        )}
        {mode === ETitleMode.Form && (
          <CreateCardForm
            projectId={projectId}
            columnId={objectId}
            onCancel={handleCancel}
            onFinish={handleFinish}
            onHeightChange={handleHeightChange}
          />
        )}
        <div className={styles.addon} />
      </div>
    </div>
  );
}

export default memo(ColumnFooter);

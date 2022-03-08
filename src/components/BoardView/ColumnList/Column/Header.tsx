import { DownOutlined } from '@ant-design/icons';
import { DraggableProvidedDragHandleProps } from '@breeze2/react-beautiful-dnd';
import classnames from 'classnames';
import { forwardRef, memo, useState } from 'react';
import { ETitleMode } from '../../types';
import RenameColumnForm from './RenameColumnForm';
import styles from './index.module.scss';

interface IColumnHeaderProps {
  objectId: string;
  title: string;
  dragHandle?: DraggableProvidedDragHandleProps;
}

const ColumnHeader = forwardRef<HTMLDivElement, IColumnHeaderProps>(
  (props, ref) => {
    const { objectId, title, dragHandle } = props;
    const [mode, setMode] = useState(ETitleMode.Text);
    const handleTextClick = () => {
      setMode(ETitleMode.Form);
    };

    const handleFormCancel = () => {
      setMode(ETitleMode.Text);
    };

    const handleFormFinish = () => {
      setMode(ETitleMode.Text);
    };

    return (
      <div ref={ref} className={styles.header} {...dragHandle}>
        <div className={classnames(styles.title)}>
          {mode === ETitleMode.Text && (
            <div className={styles.text} onClick={handleTextClick}>
              <span title={title}>{title}</span>
            </div>
          )}
          {mode === ETitleMode.Form && (
            <RenameColumnForm
              objectId={objectId}
              defaultTitle={title}
              onCancel={handleFormCancel}
              onFinish={handleFormFinish}
            />
          )}
        </div>
        <div className={styles.addon}>
          <DownOutlined />
        </div>
      </div>
    );
  }
);

export default memo(ColumnHeader);

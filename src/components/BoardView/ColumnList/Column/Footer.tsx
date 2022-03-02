import { PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { memo, useRef, useState } from 'react';

import { useFormatMessage } from '../../../hooks';
import { ETitleMode } from '../../types';
import styles from './index.module.scss';

interface IColumnFooterProps {
  objectId: string;
}

function ColumnFooter(props: IColumnFooterProps) {
  const f = useFormatMessage();
  const [mode] = useState(ETitleMode.Text);
  const selfRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={selfRef} className={styles.footer}>
      <div
        className={classnames(
          styles.creator,
          mode === ETitleMode.Text ? styles.textMode : styles.formMode
        )}>
        {mode === ETitleMode.Text && (
          <div className={styles.text}>
            <PlusOutlined />
            {f('addAnotherCard')}
          </div>
        )}
        <div className={styles.addon} />
      </div>
    </div>
  );
}

export default memo(ColumnFooter);

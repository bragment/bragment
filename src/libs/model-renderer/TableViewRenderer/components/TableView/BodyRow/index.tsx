import { Cell } from '@tanstack/react-table';
import classNames from 'classnames';
import { memo } from 'react';
import {
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../../../client/types';
import { ICurrentViewRenderer } from '../../../types';
import BodyCell from './BodyCell';
import styles from '../index.module.scss';

interface IBodyRowProps {
  index: number;
  cells: Cell<IProjectDataRecord, IRecordFieldData | undefined>[];
  renderer: ICurrentViewRenderer;
  className?: string;
  topBordered?: boolean;
  bottomBordered?: boolean;
}

function BodyRow(props: IBodyRowProps) {
  const { index, cells, renderer, className, topBordered, bottomBordered } =
    props;
  return (
    <div
      role="row"
      aria-rowindex={index}
      className={classNames(
        className,
        'w-fit min-w-full',
        topBordered && 'border-t',
        bottomBordered && 'border-b',
        styles.bodyRow
      )}>
      <div
        className={classNames(
          'sticky left-0 z-10',
          'w-16',
          'justify-center',
          styles.cell
        )}>
        <div className={classNames('justify-center', styles.content)}>
          {index + 1}
        </div>
      </div>
      {cells.map((cell, i) => {
        const pinned = cell.column.getIsPinned();
        return (
          <BodyCell
            className={classNames(
              pinned ? 'sticky left-16 z-10' : 'relative',
              pinned && styles.leftScrollable
            )}
            key={i}
            index={i}
            cell={cell}
            renderer={renderer}
          />
        );
      })}
      <div
        className={classNames(
          'sticky right-0 z-10',
          'w-16',
          'justify-center',
          styles.cell,
          styles.rightScrollable
        )}>
        <div className={styles.content} />
      </div>
    </div>
  );
}

export default memo(BodyRow);

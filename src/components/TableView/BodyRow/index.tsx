import { Row } from '@tanstack/react-table';
import classNames from 'classnames';
import { memo } from 'react';
import { IProjectDataRecord } from '../../../libs/client/types';
import styles from '../index.module.scss';

interface IBodyRowProps {
  index: number;
  row: Row<IProjectDataRecord>;
  borderedTop?: boolean;
  borderedBottom?: boolean;
}

function BodyRow(props: IBodyRowProps) {
  const { index, row, borderedTop, borderedBottom } = props;
  return (
    <div
      className={classNames(
        'w-fit min-w-full',
        borderedTop && 'border-t',
        borderedBottom && 'border-b',
        styles.bodyRow
      )}>
      <div
        className={classNames(
          'sticky left-0',
          'w-16',
          'justify-center',
          styles.cell
        )}>
        {index + 1}
      </div>
      {row.getVisibleCells().map((cell) => {
        const Cell = cell.column.columnDef.cell;
        return Cell && <Cell key={cell.id} {...cell.getContext()} />;
      })}
      <div
        className={classNames(
          'sticky right-0',
          'w-16',
          'justify-center',
          styles.cell,
          styles.scrollableRight
        )}
      />
    </div>
  );
}

export default memo(BodyRow);

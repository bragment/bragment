import classNames from 'classnames';
import { memo } from 'react';
import {
  IProjectDataField,
  IProjectDataRecord,
} from '../../../libs/client/types';
import Cell from './Cell';
import styles from '../index.module.scss';

interface IBodyRowProps {
  index: number;
  record: IProjectDataRecord;
  mainField: IProjectDataField;
  visibleFields: IProjectDataField[];
  borderedTop?: boolean;
  borderedBottom?: boolean;
}

function BodyRow(props: IBodyRowProps) {
  const {
    index,
    record,
    mainField,
    visibleFields,
    borderedTop,
    borderedBottom,
  } = props;
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
      <Cell
        className={classNames('sticky left-16', styles.scrollableLeft)}
        data={record.data[mainField._id]}
        type={mainField.type}
      />
      {visibleFields.map((field) => (
        <Cell key={field._id} data={record.data[field._id]} type={field.type} />
      ))}
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

import classNames from 'classnames';
import { memo } from 'react';
import { EDataFieldType, IRecordFieldData } from '../../../libs/client/types';
import styles from '../index.module.scss';

interface IItermProps {
  data?: IRecordFieldData;
  type: EDataFieldType;
  borderedLeft?: boolean;
  borderedRight?: boolean;
  className?: string;
}

function Cell(props: IItermProps) {
  const { data, borderedLeft, borderedRight, className } = props;

  return (
    <div
      className={classNames(
        'w-52 py-0 px-4',
        borderedLeft && 'border-l',
        borderedRight && 'border-r',
        className,
        styles.cell
      )}>
      <div className="text-ellipsis overflow-hidden">{data?.value || ''}</div>
    </div>
  );
}

export default memo(Cell);

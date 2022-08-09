import classNames from 'classnames';
import { memo } from 'react';
import { IProjectDataField } from '../../../libs/client/types';
import { dataFieldTypeRecord } from '../../DataFieldTypeSelect/config';
import styles from '../index.module.scss';

interface IItermProps {
  field: IProjectDataField;
  main?: boolean;
  borderedLeft?: boolean;
  borderedRight?: boolean;
  className?: string;
}

function Cell(props: IItermProps) {
  const { field, main, borderedLeft, borderedRight, className } = props;

  const Icon = dataFieldTypeRecord[field.type]?.Icon;
  return (
    <div
      className={classNames(
        'w-52 px-4 py-0',
        'justify-start',
        borderedLeft && 'border-l',
        borderedRight && 'border-r',
        main ? 'text-info' : 'text-base-content',
        className,
        styles.cell
      )}>
      <div>
        {Icon && (
          <Icon
            className={classNames(
              'mr-2 text-lg',
              main ? 'text-info-opacity' : 'text-base-content-opacity'
            )}
          />
        )}
      </div>
      <div className="text-ellipsis overflow-hidden">{field.title}</div>
    </div>
  );
}

export default memo(Cell);

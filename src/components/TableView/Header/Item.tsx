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
}

function Item(props: IItermProps) {
  const { field, main, borderedLeft, borderedRight } = props;

  const Icon = dataFieldTypeRecord[field.type]?.Icon;
  return (
    <div
      className={classNames(
        'border-base-300',
        'w-40 flex items-center',
        borderedLeft && 'border-l',
        borderedRight && 'border-r',
        main && styles.mainBadge,
        styles.item
      )}>
      {Icon && (
        <Icon
          className={classNames('mr-2 text-lg', 'text-base-content-opacity')}
        />
      )}
      {field.title}
    </div>
  );
}

export default memo(Item);

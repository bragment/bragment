import classNames from 'classnames';
import { memo } from 'react';
import { getFieldIcon } from '../../../../fileds/renders';
import { IProjectDataField } from '../../../../libs/client/types';
import { useFormatMessage } from '../../../hooks';
import styles from './index.module.scss';

interface IFieldItemProps {
  field: IProjectDataField;
  main: boolean;
  visible: boolean;
  onVisibleChange: (field: IProjectDataField, visible: boolean) => void;
}

function FieldItem(props: IFieldItemProps) {
  const { field, main, visible, onVisibleChange } = props;
  const f = useFormatMessage();
  const handleChange = () => {
    onVisibleChange(field, !visible);
  };
  const Icon = getFieldIcon(field.type);

  return (
    <div className={classNames('bg-base-100', 'rounded-lg')}>
      <div
        className={classNames(
          !main &&
            visible &&
            'hover:bg-base-content/10 active:bg-base-content/10',
          'rounded-lg px-4 py-3 flex items-center',
          main ? 'text-info' : 'text-base-content'
        )}>
        {Icon && <Icon className="flex-none mr-2 text-lg" />}
        <span className="flex-auto mr-2 text-ellipsis overflow-hidden whitespace-nowrap">
          {field.title}
        </span>
        {main ? (
          <div
            className={classNames(
              'badge badge-info',
              'relative',
              styles.mainFieldBadge
            )}>
            {f('dataView.mainField')}
            <div
              className={classNames(
                'badge badge-info',
                'absolute right-0 opacity-0 whitespace-nowrap pointer-events-none'
              )}>
              {f('dataView.mainFieldVisibleFirst')}
            </div>
          </div>
        ) : (
          <input
            type="checkbox"
            className="flex-none toggle"
            checked={visible}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default memo(FieldItem);

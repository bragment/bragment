import classNames from 'classnames';
import { memo } from 'react';
import { IProjectDataField } from '../../../../libs/client/types';
import { useFormatMessage } from '../../../hooks';

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
  return (
    <div className={classNames('bg-base-100', 'rounded-lg')}>
      <div
        className={classNames(
          !main &&
            visible &&
            'hover:bg-base-content/10 active:bg-base-content/10',
          'rounded-lg px-4 py-3 flex items-center'
        )}>
        <span className="flex-auto">{field.title}</span>
        {main ? (
          <div className="badge badge-info">{f('project.mainField')}</div>
        ) : (
          <input
            type="checkbox"
            className="flex-none toggle toggle-primary"
            checked={visible}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default memo(FieldItem);

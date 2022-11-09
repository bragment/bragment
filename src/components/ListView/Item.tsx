import classNames from 'classnames';
import { memo } from 'react';
import { IProjectDataField, IProjectDataRecord } from '../../libs/client/types';
import { getFieldRenderer } from '../../libs/fields';

interface IItemProps {
  index: number;
  mainField?: IProjectDataField;
  record: IProjectDataRecord;
}

function Item(props: IItemProps) {
  const { record, mainField } = props;
  const renderer = mainField ? getFieldRenderer(mainField.type) : undefined;

  return (
    <div className={classNames('border-base-300', 'h-24 px-6 py-3 border-b')}>
      <p className={classNames('text-base-content', 'font-bold text-base')}>
        {mainField && renderer
          ? renderer.getStringValue(mainField, record)
          : null}
      </p>
    </div>
  );
}

export default memo(Item);

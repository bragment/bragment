import classNames from 'classnames';
import { memo } from 'react';
import { IProjectDataField } from '../../../libs/client/types';
import SearchInput from './SearchInput';
import VisibilityButton from './VisibilityButton';

interface IControlRowProps {
  mainFieldId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  visibleFieldCount?: number;
  visibilityUpdating?: boolean;
  onVisibilityChange: (fieldIds: string[]) => void;
  onShouldUpdateVisibility?: () => void;
  onSearchInputChange: (value: string) => void;
}

function ControlRow(props: IControlRowProps) {
  const {
    mainFieldId,
    modelFields,
    visibleFieldIds,
    visibleFieldCount,
    visibilityUpdating,
    onSearchInputChange,
    onVisibilityChange,
    onShouldUpdateVisibility,
  } = props;

  return (
    <div
      className={classNames(
        'bg-base-200 border-base-300',
        'sticky left-0 top-0 z-40',
        'h-12 border-t',
        'flex items-center pl-2 gap-2'
      )}>
      <SearchInput onChange={onSearchInputChange} />
      <VisibilityButton
        mainFieldId={mainFieldId}
        modelFields={modelFields}
        visibleFieldIds={visibleFieldIds}
        count={visibleFieldCount}
        loading={visibilityUpdating}
        onChange={onVisibilityChange}
        onClose={onShouldUpdateVisibility}
      />
    </div>
  );
}

export default memo(ControlRow);

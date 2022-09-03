import classNames from 'classnames';
import { memo } from 'react';
import {
  IProjectDataField,
  IProjectDataSorter,
} from '../../../libs/client/types';
import SearchInput from './SearchInput';
import SortingButton from './SortingButton';
import VisibilityButton from './VisibilityButton';

interface IControlRowProps {
  mainFieldId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  visibleFieldCount?: number;
  sorters: IProjectDataSorter[];
  onSortingChange: (sorters: IProjectDataSorter[]) => void;
  onVisibilityChange: (fieldIds: string[]) => void;
  onShouldUpdateVisibility?: () => void;
  onShouldUpdateSorting?: () => void;
  onSearchInputChange: (value: string) => void;
}

function ControlRow(props: IControlRowProps) {
  const {
    mainFieldId,
    modelFields,
    visibleFieldIds,
    visibleFieldCount,
    sorters,
    onSearchInputChange,
    onSortingChange,
    onVisibilityChange,
    onShouldUpdateVisibility,
    onShouldUpdateSorting,
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
      <SortingButton
        modelFields={modelFields}
        visibleFieldIds={visibleFieldIds}
        sorters={sorters}
        onChange={onSortingChange}
        onClose={onShouldUpdateSorting}
      />
      <VisibilityButton
        mainFieldId={mainFieldId}
        modelFields={modelFields}
        visibleFieldIds={visibleFieldIds}
        count={visibleFieldCount}
        onChange={onVisibilityChange}
        onClose={onShouldUpdateVisibility}
      />
    </div>
  );
}

export default memo(ControlRow);

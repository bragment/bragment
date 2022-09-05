import classNames from 'classnames';
import { memo } from 'react';
import {
  IProjectDataField,
  IProjectDataFilter,
  IProjectDataSorter,
} from '../../../libs/client/types';
import FilterButton from './FilterButton';
import SearchInput from './SearchInput';
import SortingButton from './SortingButton';
import VisibilityButton from './VisibilityButton';

interface IControlRowProps {
  mainFieldId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  visibleFieldCount?: number;
  sorters: IProjectDataSorter[];
  filters: IProjectDataFilter[];
  onSearchInputChange: (value: string) => void;
  onFiltersChange: (filters: IProjectDataFilter[]) => void;
  onSortingChange: (sorters: IProjectDataSorter[]) => void;
  onVisibilityChange: (fieldIds: string[]) => void;
  onShouldUpdateVisibility?: () => void;
  onShouldUpdateSorting?: () => void;
  onShouldUpdateFilters?: () => void;
}

function ControlRow(props: IControlRowProps) {
  const {
    mainFieldId,
    modelFields,
    visibleFieldIds,
    visibleFieldCount,
    sorters,
    filters,
    onSearchInputChange,
    onFiltersChange,
    onSortingChange,
    onVisibilityChange,
    onShouldUpdateFilters,
    onShouldUpdateVisibility,
    onShouldUpdateSorting,
  } = props;

  return (
    <div
      className={classNames(
        'bg-base-200 border-base-300',
        'sticky left-0 top-0 z-40',
        'h-12 border-t',
        'flex items-center px-2 gap-2'
      )}>
      <SearchInput onChange={onSearchInputChange} />
      <div className="flex-auto pointer-events-none" />
      <FilterButton
        modelFields={modelFields}
        visibleFieldIds={visibleFieldIds}
        filters={filters}
        onChange={onFiltersChange}
        onClose={onShouldUpdateFilters}
      />
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

import { memo } from 'react';
import {
  IDataFilter,
  IDataSorter,
  IProject,
  IProjectDataField,
  IProjectDataForm,
} from '../../../libs/client/types';
import CreateButton from './CreateButton';
import FilterButton from './FilterButton';
import SearchInput from './SearchInput';
import SortingButton from './SortingButton';
import VisibilityButton from './VisibilityButton';

interface IControlRowProps {
  projectId: string;
  modelId: string;
  modelFields: IProjectDataField[];
  modelForms: IProjectDataForm[];
  visibleFieldIds: string[];
  visibleFieldCount?: number;
  mainFieldId?: string;
  sorters: IDataSorter[];
  filters: IDataFilter[];
  onSearchInputChange: (value: string) => void;
  onFiltersChange: (filters: IDataFilter[]) => void;
  onSortingChange: (sorters: IDataSorter[]) => void;
  onVisibilityChange: (fieldIds: string[]) => void;
  onShouldUpdateVisibility?: () => void;
  onShouldUpdateSorting?: () => void;
  onShouldUpdateFilters?: () => void;
  onCreateDataFieldFinish?: (project: IProject) => void;
}

function ControlRow(props: IControlRowProps) {
  const {
    projectId,
    modelId,
    mainFieldId,
    modelFields,
    modelForms,
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
    onCreateDataFieldFinish,
  } = props;

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="p-3 flex-none flex items-center justify-start gap-3">
        <CreateButton
          projectId={projectId}
          modelId={modelId}
          modelFields={modelFields}
          visibleFieldIds={visibleFieldIds}
          modelForms={modelForms}
        />
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
          projectId={projectId}
          modelId={modelId}
          mainFieldId={mainFieldId}
          modelFields={modelFields}
          visibleFieldIds={visibleFieldIds}
          count={visibleFieldCount}
          onChange={onVisibilityChange}
          onClose={onShouldUpdateVisibility}
          onCreateDataFieldFinish={onCreateDataFieldFinish}
        />
      </div>
      <div className="px-3 flex-auto flex items-center justify-end">
        <SearchInput onChange={onSearchInputChange} />
      </div>
    </div>
  );
}

export default memo(ControlRow);

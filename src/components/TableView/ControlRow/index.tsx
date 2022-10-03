import classNames from 'classnames';
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
  mainFieldId: string;
  modelFields: IProjectDataField[];
  modelForms: IProjectDataForm[];
  visibleFieldIds: string[];
  visibleFieldCount?: number;
  sorters: IDataSorter[];
  filters: IDataFilter[];
  onSearchInputChange: (value: string) => void;
  onFiltersChange: (filters: IDataFilter[]) => void;
  onSortingChange: (sorters: IDataSorter[]) => void;
  onVisibilityChange: (fieldIds: string[]) => void;
  onShouldUpdateVisibility?: () => void;
  onShouldUpdateSorting?: () => void;
  onShouldUpdateFilters?: () => void;
  onCreateDateFieldFinish?: (project: IProject) => void;
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
    onCreateDateFieldFinish,
  } = props;

  return (
    <div
      className={classNames(
        'bg-base-200 border-base-300',
        'sticky left-0 top-0 z-40',
        'h-12 px-2 border-t',
        'flex items-center gap-2'
      )}>
      <SearchInput onChange={onSearchInputChange} />
      {!!modelFields.length && (
        <>
          <CreateButton
            projectId={projectId}
            modelId={modelId}
            mainFieldId={mainFieldId}
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
            onCreateDateFieldFinish={onCreateDateFieldFinish}
          />
        </>
      )}
    </div>
  );
}

export default memo(ControlRow);

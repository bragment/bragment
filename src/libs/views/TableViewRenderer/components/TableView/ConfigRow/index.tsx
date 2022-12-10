import classNames from 'classnames';
import { memo } from 'react';
import { IProject, IProjectDataField } from '../../../../../client/types';
import { ICurrentViewRenderer } from '../../../types';
import FilterButton from './FilterButton';
import SearchInput from './SearchInput';
import SortingButton from './SortingButton';
import VisibilityButton from './VisibilityButton';

interface IControlRowProps {
  renderer: ICurrentViewRenderer;
  modelFields: IProjectDataField[];
  className?: string;
  onCreateDataFieldFinish?: (project: IProject) => void;
}

function ControlRow(props: IControlRowProps) {
  const { modelFields, renderer, className, onCreateDataFieldFinish } = props;

  return (
    <div
      className={classNames(
        className,
        'px-3 pb-3 flex flex-wrap items-center justify-between'
      )}>
      <div className="mt-3 flex-none flex items-center justify-start gap-3">
        {/* <CreateButton
          projectId={projectId}
          modelId={modelId}
          modelFields={modelFields}
          visibleFieldIds={visibleFieldIds}
          modelForms={modelForms}
        /> */}
        <FilterButton modelFields={modelFields} renderer={renderer} />
        <SortingButton modelFields={modelFields} renderer={renderer} />
        <VisibilityButton
          modelFields={modelFields}
          renderer={renderer}
          onCreateDataFieldFinish={onCreateDataFieldFinish}
        />
      </div>
      <div className="mt-3 flex-auto flex items-center justify-end">
        <SearchInput renderer={renderer} />
      </div>
    </div>
  );
}

export default memo(ControlRow);

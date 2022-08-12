import classNames from 'classnames';
import { memo } from 'react';
import { HiHashtag, HiPlus } from 'react-icons/hi';
import { IProject, IProjectDataField } from '../../../libs/client/types';
import AnimatePing from '../../AnimatePing';
import CreateDataFieldButton from '../../CreateDataFieldButton';
import { useFormatMessage } from '../../hooks';
import Cell from './Cell';
import styles from '../index.module.scss';

interface IHeadRowProps {
  projectId: string;
  modelId: string;
  fields: IProjectDataField[];
  visibleFields: IProjectDataField[];
  mainField?: IProjectDataField;
  onCreateDateFieldFinish: (project: IProject) => void;
}

function HeadRow(props: IHeadRowProps) {
  const f = useFormatMessage();
  const {
    projectId,
    modelId,
    fields,
    visibleFields,
    mainField,
    onCreateDateFieldFinish,
  } = props;

  const hasNoField = !mainField && visibleFields.length === 0;
  return (
    <div
      className={classNames(
        'sticky top-0 z-10',
        'w-fit min-w-full border-t border-b',
        styles.headRow
      )}>
      <div
        className={classNames(
          'sticky left-0',
          'w-16',
          'justify-center',
          styles.cell
        )}>
        <HiHashtag className="text-lg" />
      </div>
      {mainField && (
        <Cell
          className={classNames('sticky left-16', styles.scrollableLeft)}
          field={mainField}
          main
        />
      )}
      {visibleFields.map((field) => (
        <Cell key={field._id} field={field} />
      ))}
      {hasNoField && (
        <div className={classNames('w-52', 'justify-center', styles.cell)}>
          {f('project.noFields')}
        </div>
      )}
      <div
        className={classNames(
          'sticky right-0',
          'w-16 p-0',
          'justify-center',
          styles.cell,
          styles.scrollableRight
        )}>
        <AnimatePing ping={hasNoField}>
          <CreateDataFieldButton
            projectId={projectId}
            modelId={modelId}
            existingFields={fields}
            onFinish={onCreateDateFieldFinish}>
            <HiPlus className="text-lg" />
          </CreateDataFieldButton>
        </AnimatePing>
      </div>
    </div>
  );
}
export default memo(HeadRow);

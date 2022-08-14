import { Header } from '@tanstack/react-table';
import classNames from 'classnames';
import { memo } from 'react';
import { HiHashtag, HiPlus } from 'react-icons/hi';
import {
  IProject,
  IProjectDataField,
  IProjectDataRecord,
} from '../../../libs/client/types';
import AnimatePing from '../../AnimatePing';
import CreateDataFieldButton from '../../CreateDataFieldButton';
import { useFormatMessage } from '../../hooks';
import styles from '../index.module.scss';

interface IHeadRowProps {
  projectId: string;
  modelId: string;
  modelFields: IProjectDataField[];
  headers: Header<IProjectDataRecord, unknown>[];
  onCreateDateFieldFinish: (project: IProject) => void;
}

function HeadRow(props: IHeadRowProps) {
  const f = useFormatMessage();
  const { projectId, modelId, modelFields, headers, onCreateDateFieldFinish } =
    props;
  const hasNoField = headers.length === 0;

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
      {headers.map((header) => {
        const HeaderComponent = header.column.columnDef.header;
        return (
          HeaderComponent && (
            <HeaderComponent key={header.id} {...header.getContext()} />
          )
        );
      })}
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
            existingFields={modelFields}
            onFinish={onCreateDateFieldFinish}>
            <HiPlus className="text-lg" />
          </CreateDataFieldButton>
        </AnimatePing>
      </div>
    </div>
  );
}
export default memo(HeadRow);

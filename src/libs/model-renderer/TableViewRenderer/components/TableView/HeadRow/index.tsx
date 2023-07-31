import { Header } from '@tanstack/react-table';
import classNames from 'classnames';
import { memo } from 'react';
import { HiHashtag, HiPlus } from 'react-icons/hi';
import CreateDataFieldDropdown from '../../../../../../components/CreateDataFieldDropdown';
import { useFormatMessage } from '../../../../../../components/hooks';
import {
  IProject,
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../../../client/types';
import { ICurrentViewRenderer } from '../../../types';

import HeaderCell from './HeaderCell';
import styles from '../index.module.scss';

interface IHeadRowProps {
  index: number;
  headers: Header<IProjectDataRecord, IRecordFieldData | undefined>[];
  renderer: ICurrentViewRenderer;
  modelFields: IProjectDataField[];
  className?: string;
  onCreateDataFieldFinish?: (project: IProject) => void;
}

function HeadRow(props: IHeadRowProps) {
  const f = useFormatMessage();
  const { modelFields, headers, renderer, className, onCreateDataFieldFinish } =
    props;
  const { projectId, modelId } = renderer.commonStore.unobservable;

  return (
    <div className={classNames(className, 'w-fit min-w-full', styles.headRow)}>
      <div
        className={classNames(
          'sticky left-0 z-10',
          'w-16',
          'justify-center',
          styles.cell
        )}>
        <HiHashtag className="text-lg" />
      </div>
      {headers.map((header, i) => {
        const pinned = header.column.getIsPinned();
        return (
          <HeaderCell
            className={classNames(
              // TODO: calculate left position
              pinned ? 'sticky left-16 z-10' : 'relative',
              pinned && styles.leftScrollable
            )}
            key={header.column.id}
            index={i}
            header={header}
            renderer={renderer}
            modelFields={modelFields}
          />
        );
      })}
      <div
        className={classNames(
          'sticky right-0 z-10',
          'w-16 p-0',
          'justify-center',
          styles.cell,
          styles.rightScrollable
        )}>
        <CreateDataFieldDropdown
          projectId={projectId}
          modelId={modelId}
          existingFields={modelFields}
          onFinish={onCreateDataFieldFinish}>
          <button
            title={f('dataView.addField')}
            className={classNames('btn btn-ghost btn-sm', 'h-10')}>
            <HiPlus aria-label={f('dataView.addField')} className="text-lg" />
          </button>
        </CreateDataFieldDropdown>
      </div>
    </div>
  );
}
export default memo(HeadRow);

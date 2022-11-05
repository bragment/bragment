import { Header } from '@tanstack/react-table';
import classNames from 'classnames';
import { memo } from 'react';
import { HiHashtag, HiPlus } from 'react-icons/hi';
import {
  IProject,
  IProjectDataField,
  IProjectDataRecord,
} from '../../../libs/client/types';
import CreateDataFieldDropdown from '../../CreateDataFieldDropdown';
import { useFormatMessage } from '../../hooks';
import styles from '../index.module.scss';

interface IHeadRowProps {
  projectId: string;
  modelId: string;
  modelFields: IProjectDataField[];
  headers: Header<IProjectDataRecord, unknown>[];
  onCreateDataFieldFinish: (project: IProject) => void;
}

function HeadRow(props: IHeadRowProps) {
  const f = useFormatMessage();
  const { projectId, modelId, modelFields, headers, onCreateDataFieldFinish } =
    props;

  return (
    <div
      className={classNames(
        'sticky top-0 z-30',
        'w-fit min-w-full border-t border-b',
        styles.headRow
      )}>
      <div
        className={classNames(
          'sticky left-0 z-10',
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

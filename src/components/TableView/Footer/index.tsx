import classNames from 'classnames';
import { memo } from 'react';
import { HiPlus } from 'react-icons/hi';
import { IProjectDataField } from '../../../libs/client/types';
import CreateDataRecordForm from './CreateDataRecordForm';
import styles from '../index.module.scss';

interface IFooterProps {
  projectId: string;
  modelId: string;
  fields: IProjectDataField[];
  mainField: IProjectDataField;
}

function Footer(props: IFooterProps) {
  const { projectId, modelId, mainField } = props;

  return (
    <div
      className={classNames(
        'bg-base-100 text-base-content border-base-300',
        'min-w-full sticky left-0 bottom-0 flex items-start border-b'
      )}>
      <div
        className={classNames(
          'flex-none w-16 h-12 flex items-center justify-center'
        )}>
        <HiPlus className="text-lg" />
      </div>
      <div
        className={classNames(
          'border-base-300',
          'flex-auto border-l py-1',
          styles.recordFormWrapper
        )}>
        <CreateDataRecordForm
          projectId={projectId}
          modelId={modelId}
          mainField={mainField}
        />
      </div>
    </div>
  );
}
export default memo(Footer);

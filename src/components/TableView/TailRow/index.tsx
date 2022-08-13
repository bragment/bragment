import classNames from 'classnames';
import { memo, useCallback, useRef, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { IProjectDataField } from '../../../libs/client/types';
import CreateDataRecordForm, {
  ICreateDataRecordFormRef,
} from './CreateDataRecordForm';
import styles from '../index.module.scss';

interface ITailRowProps {
  projectId: string;
  modelId: string;
  mainFieldId: string;
  modelFields: IProjectDataField[];
  borderedTop?: boolean;
  borderedBottom?: boolean;
}

function TailRow(props: ITailRowProps) {
  const {
    projectId,
    modelId,
    mainFieldId,
    modelFields,
    borderedTop,
    borderedBottom,
  } = props;
  const mainField = modelFields.find((field) => field._id === mainFieldId);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<ICreateDataRecordFormRef>(null);

  const handleLoadingChange = useCallback(
    (value: boolean) => setLoading(value),
    []
  );

  const handlePlusClick = useCallback(() => {
    formRef.current?.focus();
  }, []);

  return (
    <div
      className={classNames(
        'sticky bottom-0 left-0',
        'min-w-full',
        borderedTop && 'border-t',
        borderedBottom && 'border-b',
        styles.tailRow
      )}>
      <div
        className={classNames('w-16', 'flex-none justify-center', styles.cell)}>
        {loading ? (
          <div className="icon loading" />
        ) : (
          <HiPlus
            className="text-lg cursor-pointer"
            onClick={handlePlusClick}
          />
        )}
      </div>
      <div className={classNames('flex-auto py-1')}>
        {mainField && (
          <CreateDataRecordForm
            ref={formRef}
            projectId={projectId}
            modelId={modelId}
            mainField={mainField}
            onLoadingChange={handleLoadingChange}
          />
        )}
      </div>
    </div>
  );
}
export default memo(TailRow);

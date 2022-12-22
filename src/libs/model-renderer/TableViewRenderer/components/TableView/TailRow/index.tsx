import classNames from 'classnames';
import { memo, useCallback, useRef, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import AnimateSpin from '../../../../../../components/AnimateSpin';
import { useFormatMessage } from '../../../../../../components/hooks';
import {
  IProjectDataField,
  IProjectDataRecord,
} from '../../../../../client/types';
import { ICurrentViewRenderer } from '../../../types';
import CreateDataRecordForm, {
  ICreateDataRecordFormRef,
} from './CreateDataRecordForm';
import styles from '../index.module.scss';

interface ITailRowProps {
  modelFields: IProjectDataField[];
  renderer: ICurrentViewRenderer;
  borderedTop?: boolean;
  borderedBottom?: boolean;
  onCreateDataRecordFinish?: (record: IProjectDataRecord) => void;
}

function TailRow(props: ITailRowProps) {
  const {
    modelFields,
    renderer,
    borderedTop,
    borderedBottom,
    onCreateDataRecordFinish,
  } = props;
  const { unobservable, mainFieldId } = renderer.commonStore;
  const { projectId, modelId } = unobservable;
  const f = useFormatMessage();
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
        'sticky bottom-0 left-0 z-20',
        'min-w-full',
        borderedTop && 'border-t',
        borderedBottom && 'border-b',
        styles.tailRow
      )}>
      <div
        className={classNames('w-16', 'flex-none justify-center', styles.cell)}>
        {loading ? (
          <AnimateSpin className="w-4 h-4" />
        ) : (
          <HiPlus
            aria-label={f('dataView.addData')}
            className="text-lg cursor-pointer"
            onClick={handlePlusClick}
          />
        )}
      </div>
      <div
        className={classNames(
          'flex-auto py-1',
          'focus-within:ring-inset focus-within:ring-4 focus-within:ring-secondary'
        )}>
        {mainField && (
          <CreateDataRecordForm
            ref={formRef}
            projectId={projectId}
            modelId={modelId}
            mainField={mainField}
            onLoadingChange={handleLoadingChange}
            onFinish={onCreateDataRecordFinish}
          />
        )}
      </div>
    </div>
  );
}
export default memo(TailRow);

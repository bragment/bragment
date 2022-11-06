import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Dialog from '../../components/Dialog';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import ScrollContainer from '../../components/ScrollContainer';
import { useCreateProjectDataRecordMutation } from '../../libs/react-query';
import { IInnerDataFormItem } from '../CreateDataFormDialog/CreateForm';
import {
  initializeFormItems,
  initializeHiddenItems,
} from '../CreateDataFormDialog/helpers';
import CreateDataRecordForm, {
  ICreateDataRecordFormRef,
} from './CreateDataRecordForm';

const DIALOG_ID = 'CREATE_RECORD_FORM_DIALOG';

function CreateDataRecordDialog() {
  const f = useFormatMessage();
  const createDataRecordFormRef = useRef<ICreateDataRecordFormRef>(null);
  const {
    createDataRecordDialogVisible,
    createDataRecordDialogOptions,
    setCreateDataRecordDialogVisible,
  } = useDialogStore();
  const { isLoading, mutateAsync } = useCreateProjectDataRecordMutation();
  const projectId = createDataRecordDialogOptions?.projectId;
  const modelId = createDataRecordDialogOptions?.modelId;
  const modelForm = createDataRecordDialogOptions?.modelForm;
  const title = modelForm?.title || '';
  const [formItems, setFormItems] = useState<IInnerDataFormItem[]>([]);
  const [hiddenItems, setHiddenItems] = useState<IInnerDataFormItem[]>([]);

  const handleCancel = useCallback(() => {
    setCreateDataRecordDialogVisible(false);
  }, [setCreateDataRecordDialogVisible]);

  const handleSave = async () => {
    if (isLoading || !projectId) {
      return;
    }
    const data = createDataRecordFormRef.current?.getData();
    if (data) {
      await mutateAsync({
        projectId,
        ...data,
      });
      setCreateDataRecordDialogVisible(false);
    }
  };

  useLayoutEffect(() => {
    if (createDataRecordDialogVisible) {
      const _modelFields = createDataRecordDialogOptions?.modelFields || [];
      const _visibleFieldIds = createDataRecordDialogOptions?.visibleFieldIds;
      const _modelForm = createDataRecordDialogOptions?.modelForm;
      setFormItems(
        initializeFormItems(_modelFields, _visibleFieldIds, _modelForm)
      );
      setHiddenItems(
        initializeHiddenItems(_modelFields, _visibleFieldIds, _modelForm)
      );
    } else {
      setFormItems([]);
      setHiddenItems([]);
    }
  }, [createDataRecordDialogVisible, createDataRecordDialogOptions]);

  return (
    <Dialog
      id={DIALOG_ID}
      className="w-11/12 max-w-5xl p-0"
      visible={createDataRecordDialogVisible}
      onClose={handleCancel}>
      <div className={classNames('w-full h-full relative')}>
        <h3
          className={classNames(
            'text-base-content',
            'p-[1.125rem] text-lg font-bold'
          )}>
          {f('project.createData')}
        </h3>
        <div
          style={{ height: 'calc(100vh - 16.25rem)' }}
          className={classNames(
            'border-base-200',
            'border-t border-b',
            'flex flex-row'
          )}>
          <div className={classNames('flex-auto')}>
            <ScrollContainer>
              {modelId && projectId && (
                <div className="max-w-xl mx-auto">
                  <CreateDataRecordForm
                    ref={createDataRecordFormRef}
                    projectId={projectId}
                    modelId={modelId}
                    title={title}
                    items={formItems}
                    hiddenItems={hiddenItems}
                  />
                </div>
              )}
            </ScrollContainer>
          </div>
        </div>
      </div>
      <div className={classNames('modal-action', 'mt-0 py-4 px-8')}>
        <button
          className={classNames('btn btn-primary', isLoading && 'loading')}
          onClick={handleSave}>
          {f('common.save')}
        </button>
      </div>
    </Dialog>
  );
}

export default observer(CreateDataRecordDialog);

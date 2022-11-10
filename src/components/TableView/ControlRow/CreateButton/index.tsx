import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import { memo, useCallback, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlineChevronDown, HiOutlinePlus } from 'react-icons/hi';
import {
  IProjectDataField,
  IProjectDataForm,
} from '../../../../libs/client/types';
import { useDeleteProjectDataFormMutation } from '../../../../libs/react-query';
import { stopEventPropagation } from '../../../../utils';
import { useDialogStore, useFormatMessage } from '../../../hooks';
import ScrollContainer from '../../../ScrollContainer';
import Item from './Item';

interface ICreateButtonProps {
  modelForms: IProjectDataForm[];
  projectId: string;
  modelId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds?: string[];
}

function CreateButton(props: ICreateButtonProps) {
  const { modelForms, projectId, modelId, modelFields, visibleFieldIds } =
    props;
  const scrollBarsRef = useRef<Scrollbars>(null);
  const externalToggleRef = useRef<HTMLButtonElement>(null);
  const { setCreateDataFormDialogVisible, setCreateDataRecordDialogVisible } =
    useDialogStore();
  const { mutateAsync } = useDeleteProjectDataFormMutation();
  const f = useFormatMessage();

  const handleFormClick = useCallback(
    (modelForm?: IProjectDataForm) => {
      setCreateDataRecordDialogVisible(true, {
        projectId,
        modelId,
        modelForm,
        modelFields,
        visibleFieldIds,
      });
    },
    [
      setCreateDataRecordDialogVisible,
      projectId,
      modelId,
      modelFields,
      visibleFieldIds,
    ]
  );
  const handleFormEdit = useCallback(
    (modelForm: IProjectDataForm) => {
      setCreateDataFormDialogVisible(true, {
        projectId,
        modelId,
        modelForm,
        modelFields,
        editing: true,
      });
    },
    [setCreateDataFormDialogVisible, projectId, modelId, modelFields]
  );
  const handleFormDelete = useCallback(
    async (form: IProjectDataForm) => {
      await mutateAsync({ projectId, form });
    },
    [mutateAsync, projectId]
  );

  const renderItem = useCallback(
    (form: IProjectDataForm) => (
      <Item
        key={form._id}
        form={form}
        onClick={handleFormClick}
        onEdit={handleFormEdit}
        onDelete={handleFormDelete}
      />
    ),
    [handleFormClick, handleFormEdit, handleFormDelete]
  );

  const handleVisibleChange = useCallback((visible: boolean) => {
    if (visible) {
      scrollBarsRef.current?.scrollToTop();
    }
  }, []);

  const handleCreateDataClick = () => {
    handleFormClick();
  };

  const handleCreateFormClick = () => {
    setCreateDataFormDialogVisible(true, {
      projectId,
      modelId,
      modelFields,
      visibleFieldIds,
      existingForms: modelForms,
    });
  };

  return (
    <div className="btn-group">
      <button
        className={classNames('btn btn-sm', 'h-10')}
        onClick={handleCreateDataClick}>
        <HiOutlinePlus className="text-base mr-2" />
        {f('project.createData')}
      </button>
      <Dropdown
        trigger="click"
        onVisibleChange={handleVisibleChange}
        overlay={
          <div
            className={classNames(
              'bg-base-100 border-base-300',
              'w-56 px-0 py-2 border overflow-hidden rounded-xl shadow'
            )}
            onClick={stopEventPropagation}
            onKeyDown={stopEventPropagation}>
            <ScrollContainer
              ref={scrollBarsRef}
              autoHeight
              withVerticalShadow
              autoHeightMax={280}>
              <ul className="px-2">{modelForms.map(renderItem)}</ul>
            </ScrollContainer>
            <div className="w-full px-2">
              <button
                className={classNames(
                  'btn btn-sm btn-ghost',
                  'h-10 justify-start'
                )}
                onClick={handleCreateFormClick}>
                <HiOutlinePlus className="text-base mr-2" />
                {f('project.createForm')}
              </button>
            </div>
          </div>
        }>
        <button
          ref={externalToggleRef}
          className={classNames('btn btn-sm', 'h-10')}>
          <HiOutlineChevronDown className="text-base" />
        </button>
      </Dropdown>
    </div>
  );
}

export default memo(CreateButton);

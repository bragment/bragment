import classNames from 'classnames';
import { memo, useCallback, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  HiOutlineChevronDown,
  HiOutlineClipboardList,
  HiOutlinePlus,
} from 'react-icons/hi';
import {
  IProjectDataField,
  IProjectDataForm,
} from '../../../../libs/client/types';
import Dropdown, { IDropdownRef } from '../../../Dropdown';
import { useDialogStore, useFormatMessage } from '../../../hooks';
import ScrollContainer from '../../../ScrollContainer';
import Item from './Item';

interface ICreateButtonProps {
  modelForms: IProjectDataForm[];
  projectId: string;
  modelId: string;
  mainFieldId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds?: string[];
}

function CreateButton(props: ICreateButtonProps) {
  const {
    modelForms,
    projectId,
    modelId,
    mainFieldId,
    modelFields,
    visibleFieldIds,
  } = props;
  const scrollBarsRef = useRef<Scrollbars>(null);
  const dropdownRef = useRef<IDropdownRef>(null);
  const externalToggleRef = useRef<HTMLButtonElement>(null);
  const { setCreateDataFormDialogVisible, setCreateDataRecordDialogVisible } =
    useDialogStore();
  const f = useFormatMessage();

  const handleFormClick = useCallback(
    (modelForm: IProjectDataForm) => {
      setCreateDataRecordDialogVisible(true, {
        projectId,
        modelId,
        modelForm,
        modelFields,
      });
    },
    [setCreateDataRecordDialogVisible, projectId, modelId, modelFields]
  );

  const renderItem = useCallback(
    (form: IProjectDataForm) => (
      <Item key={form._id} form={form} onClick={handleFormClick} />
    ),
    [handleFormClick]
  );

  const handleListFormClick = () => {
    dropdownRef.current?.toggle();
  };

  const handleCreateDataClick = () => {
    handleFormClick(modelForms[0]);
  };

  const handleCreateFormClick = () => {
    setCreateDataFormDialogVisible(true, {
      projectId,
      modelId,
      mainFieldId,
      modelFields,
      visibleFieldIds,
    });
  };

  if (!modelForms.length) {
    return (
      <button
        className={classNames('btn btn-sm', 'h-10')}
        onClick={handleCreateFormClick}>
        <HiOutlineClipboardList className="text-base mr-2" />
        {f('project.createForm')}
      </button>
    );
  }

  return (
    <div className="btn-group">
      <button
        className={classNames('btn btn-sm', 'h-10')}
        onClick={handleCreateDataClick}>
        <HiOutlinePlus className="text-base mr-2" />
        {f('project.createData')}
      </button>
      <button
        ref={externalToggleRef}
        className={classNames('btn btn-sm', 'h-10')}
        onClick={handleListFormClick}>
        <HiOutlineChevronDown className="text-base" />
      </button>
      <Dropdown
        ref={dropdownRef}
        externalToggleRef={externalToggleRef}
        className="dropdown-end"
        contentClassName="mt-1"
        toggle={<div className="h-10" />}
        content={
          <div
            className={classNames(
              'bg-base-100 border-base-300',
              'w-56 px-0 py-2 border overflow-hidden rounded-box shadow'
            )}>
            <ScrollContainer
              ref={scrollBarsRef}
              autoHeight
              withShadow
              autoHeightMax={280}>
              <ul className="px-2">{modelForms.map(renderItem)}</ul>
            </ScrollContainer>
            <div className="w-full px-2">
              <button
                className={classNames('btn btn-ghost', 'w-full justify-start')}
                onClick={handleCreateFormClick}>
                <HiOutlinePlus className="text-base mr-2" />
                {f('project.createForm')}
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default memo(CreateButton);

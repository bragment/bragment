import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IProjectDataField } from '../../../../libs/client/types';
import { useDialogStore, useFormatMessage } from '../../../hooks';

interface ICreateFormButtonProps {
  projectId: string;
  modelId: string;
  mainFieldId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds?: string[];
}

function CreateFormButton(props: ICreateFormButtonProps) {
  const f = useFormatMessage();
  const { setCreateDataFormDialogVisible } = useDialogStore();
  const { projectId, modelId, mainFieldId, modelFields, visibleFieldIds } =
    props;

  const handleClick = () => {
    setCreateDataFormDialogVisible(true, {
      projectId,
      modelId,
      mainFieldId,
      modelFields,
      visibleFieldIds,
    });
  };

  return (
    <button className={classNames('btn btn-sm', 'h-10')} onClick={handleClick}>
      <HiOutlineClipboardList className="text-base" />
      <span className="ml-2">{f('project.createForm')}</span>
    </button>
  );
}

export default observer(CreateFormButton);

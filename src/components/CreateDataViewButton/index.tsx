import classNames from 'classnames';
import { memo, useRef } from 'react';
import {
  EDataViewType,
  IProject,
  IProjectDataView,
} from '../../libs/client/types';
import { useCreateProjectDataViewMutation } from '../../libs/react-query';
import { getAvailableTitle } from '../../utils';
import Dropdown, { IDropdownRef } from '../Dropdown';
import { useDialogStore, useFormatMessage } from '../hooks';
import { dataViewTypes } from './config';

interface ICreateDataViewButtonProps {
  projectId: string;
  modelId: string;
  children: React.ReactNode;
  className?: string;
  existingViews?: IProjectDataView[];
  onFinish?: (project: IProject) => void;
}

function CreateDataViewButton(props: ICreateDataViewButtonProps) {
  const { projectId, modelId, className, children, existingViews, onFinish } =
    props;
  const f = useFormatMessage();
  const { toastError } = useDialogStore();
  const dropdownRef = useRef<IDropdownRef>(null);
  const viewTypeRef = useRef(EDataViewType.Table);
  const { isLoading, mutateAsync } = useCreateProjectDataViewMutation();

  const handleClick = async (event: React.MouseEvent<Element>) => {
    const span = (event.target as Element).closest<HTMLSpanElement>(
      'span.action'
    );
    if (isLoading || !span) {
      return;
    }
    const type = span.dataset.type as EDataViewType;
    const title = span.dataset.title as string;
    const fields = {
      type,
      title: getAvailableTitle(
        title,
        existingViews?.map((el) => el.title)
      ),
      model: modelId,
      projectId,
    };
    viewTypeRef.current = type;
    try {
      const project = await mutateAsync(fields);
      dropdownRef.current?.close();
      if (onFinish) {
        onFinish(project);
      }
    } catch (error) {
      // TODO: handle request error
      toastError(f('common.networkError'));
    }
  };

  return (
    <Dropdown
      ref={dropdownRef}
      className={classNames('dropdown-end', className)}
      toggle={children}
      content={
        <ul
          tabIndex={0}
          className={classNames(
            'menu border-base-300 bg-base-100',
            'w-52 mt-2 p-2 border overflow-hidden rounded-box shadow'
          )}
          onClick={handleClick}>
          {dataViewTypes.map(({ type, title, Icon }) => (
            <li key={type}>
              <span
                className={classNames(
                  'action',
                  viewTypeRef.current === type && isLoading && 'active loading'
                )}
                data-type={type}
                data-title={f(title)}>
                <Icon className="text-xl" />
                {f(title)}
              </span>
            </li>
          ))}
        </ul>
      }
    />
  );
}

export default memo(CreateDataViewButton);

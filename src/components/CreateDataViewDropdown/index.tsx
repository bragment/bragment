import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import { memo, useRef } from 'react';
import { ILocalMessage } from '../../i18n/types';
import {
  EDataViewType,
  IProject,
  IProjectDataView,
} from '../../libs/client/types';
import { useCreateProjectDataViewMutation } from '../../libs/react-query';
import { getAllViewRenderers } from '../../libs/views';
import { getAvailableTitle } from '../../utils';
import AnimateSpin from '../AnimateSpin';
import { useDialogStore, useFormatMessage } from '../hooks';

interface ICreateDataViewDropdownProps {
  projectId: string;
  modelId: string;
  children: React.ReactElement;
  existingViews?: IProjectDataView[];
  onFinish?: (project: IProject) => void;
  onVisibleChange?: (visible: boolean) => void;
}

function CreateDataViewDropdown(props: ICreateDataViewDropdownProps) {
  const {
    projectId,
    modelId,
    children,
    existingViews,
    onFinish,
    onVisibleChange,
  } = props;
  const f = useFormatMessage();
  const { toastError } = useDialogStore();
  const dropdownRef = useRef<IRCDropdownRef>(null);
  const viewTypeRef = useRef(EDataViewType.Table);
  const { isLoading, mutateAsync } = useCreateProjectDataViewMutation();

  const viewRenderers = getAllViewRenderers();

  const handleClick: React.MouseEventHandler<HTMLUListElement> = async (
    event
  ) => {
    event.stopPropagation();
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
      trigger="click"
      onVisibleChange={onVisibleChange}
      overlay={
        <ul
          className={classNames(
            'menu border-base-300 bg-base-100',
            'w-52 p-2 border overflow-hidden rounded-box shadow'
          )}
          onClick={handleClick}>
          {viewRenderers.map((renderer) => {
            const { type, Icon } = renderer;
            const title = f(renderer.getName() as ILocalMessage);
            return (
              <li key={type}>
                <span
                  className={classNames(
                    'relative',
                    'action',
                    viewTypeRef.current === type && isLoading && 'active'
                  )}
                  data-type={type}
                  data-title={title}>
                  <Icon className="text-xl" />
                  {title}
                  {viewTypeRef.current === type && isLoading && (
                    <AnimateSpin className="absolute w-4 h-4 right-4" />
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      }>
      {children}
    </Dropdown>
  );
}

export default memo(CreateDataViewDropdown);

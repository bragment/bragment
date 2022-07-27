import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import {
  EDataViewType,
  IProject,
  IProjectDataView,
} from '../../libs/client/types';
import { useCreateProjectDataViewMutation } from '../../libs/react-query';
import { getAvailableTitle } from '../../utils';
import { dataViewTypes } from './config';

export interface IDropdownProps {
  projectId: string;
  modelId: string;
  existingViews?: IProjectDataView[];
  onFinish?: (project: IProject) => void;
}

function Dropdown(props: IDropdownProps) {
  const { projectId, modelId, existingViews, onFinish } = props;
  const f = useFormatMessage();
  const { toastError } = useDialogStore();
  const ulRef = useRef<HTMLUListElement>(null);
  const creatingTypeRef = useRef(EDataViewType.Table);
  const mutation = useCreateProjectDataViewMutation();

  const handleClick = useCallback(
    async (event: React.MouseEvent<Element>) => {
      const span = (event.target as Element).closest<HTMLSpanElement>(
        'span.action'
      );
      if (mutation.isLoading || !span) {
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
      creatingTypeRef.current = type;
      try {
        const project = await mutation.mutateAsync(fields);
        ulRef.current?.blur();
        if (onFinish) {
          onFinish(project);
        }
      } catch (error) {
        // TODO: handle request error
        toastError(f('common.networkError'));
      }
    },
    [projectId, modelId, mutation, existingViews, f, onFinish, toastError]
  );

  return (
    <ul
      ref={ulRef}
      tabIndex={0}
      className={classNames(
        'dropdown-content menu border-base-300 bg-base-100 rounded-box',
        'w-52 mt-2 p-2 border shadow'
      )}
      onClick={handleClick}>
      {dataViewTypes.map(({ type, title, Icon }) => (
        <li key={type}>
          <span
            className={classNames(
              'action',
              creatingTypeRef.current === type &&
                mutation.isLoading &&
                'active loading'
            )}
            data-type={type}
            data-title={title}>
            <Icon className="text-xl" />
            {f(title)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default observer(Dropdown);

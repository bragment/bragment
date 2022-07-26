import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useMemo, useRef } from 'react';
import { HiOutlineTable, HiOutlineViewBoards, HiPlus } from 'react-icons/hi';
import type { IconType } from 'react-icons/lib';
import { useParams } from 'react-router-dom';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import {
  EDataViewType,
  IProject,
  IProjectDataView,
} from '../../libs/client/types';
import { useCreateProjectDataViewMutation } from '../../libs/react-query';
import { getAvailableTitle } from '../../utils';
import styles from './index.module.scss';

interface IDataViewTypeItem {
  type: EDataViewType;
  title: string;
  Icon: IconType;
}

interface ICreateDataViewButtonProps {
  existingView?: IProjectDataView[];
  onFinish?: (project: IProject) => void;
}

function CreateDataViewButton(props: ICreateDataViewButtonProps) {
  const { existingView, onFinish } = props;
  const f = useFormatMessage();
  const { toastError } = useDialogStore();
  const ulRef = useRef<HTMLUListElement>(null);
  const creatingTypeRef = useRef(EDataViewType.Table);
  const { projectId = '', modelId = '' } = useParams();
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
          existingView?.map((el) => el.title)
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
    [projectId, modelId, mutation, existingView, f, onFinish, toastError]
  );

  const viewTypeList: IDataViewTypeItem[] = useMemo(
    () => [
      {
        type: EDataViewType.Table,
        title: f('project.table'),
        Icon: HiOutlineTable,
      },
      {
        type: EDataViewType.Board,
        title: f('project.board'),
        Icon: HiOutlineViewBoards,
      },
    ],
    [f]
  );

  return (
    <div className={classNames('dropdown dropdown-end', styles.createButton)}>
      <label
        tabIndex={0}
        className={classNames('btn btn-ghost btn-sm', 'h-10 gap-2')}>
        <HiPlus className="text-xl" />
        {f('project.addView')}
      </label>
      <ul
        ref={ulRef}
        tabIndex={0}
        className={classNames(
          'dropdown-content menu border-base-300 bg-base-100 rounded-box',
          'w-52 mt-2 p-2 border shadow'
        )}
        onClick={handleClick}>
        {viewTypeList.map(({ type, title, Icon }) => (
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
              {title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default observer(CreateDataViewButton);

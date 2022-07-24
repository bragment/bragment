import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { useCallback, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { NavLink, useParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../../components/hooks';
import WorkspaceAvatar from '../../../components/WorkspaceAvatar';
import {
  useMyWorkspaceListQuery,
  useUpdateMyDataMutation,
} from '../../../libs/react-query';
import { getWorkspaceInstancePath } from '../../helpers';
import styles from './index.module.scss';

interface IWorkspaceMenuProps {
  className?: string;
  tabIndex?: number;
}

function WorkspaceMenu(props: IWorkspaceMenuProps) {
  const { className, tabIndex } = props;
  const f = useFormatMessage();
  const ulRef = useRef<HTMLUListElement>(null);
  const scrollBar = useRef<Scrollbars>(null);
  const { workspaceId = '' } = useParams();
  const mutation = useUpdateMyDataMutation();
  const { toastError } = useDialogStore();
  const { me, myMainWorkspaceId, updateMe } = useUserStore();
  const { data: allWorkspaces } = useMyWorkspaceListQuery(!!me);
  const workspaces = allWorkspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );

  const handleClick = useCallback(() => {
    setTimeout(() => {
      ulRef.current?.blur();
      scrollBar.current?.scrollToTop();
    }, 100);
  }, []);

  const handleSetMainWorkspace = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (mutation.isLoading) {
        return;
      }
      try {
        const user = await mutation.mutateAsync({
          mainWorkspace: workspaceId,
        });
        updateMe(user);
      } catch (error) {
        // TODO: handle request error
        toastError(f('common.networkError'));
      } finally {
        ulRef.current?.blur();
      }
    },
    [mutation, workspaceId, f, toastError, updateMe]
  );

  return (
    <ul
      ref={ulRef}
      onClick={handleClick}
      tabIndex={tabIndex}
      className={classNames(
        'menu border-base-300 bg-base-100 rounded-box',
        'w-56 mt-2 p-2 border shadow',
        className,
        styles.menuWrapper
      )}>
      <Scrollbars ref={scrollBar} autoHide autoHeight>
        {workspaceId && workspaceId !== myMainWorkspaceId && (
          <li>
            <div
              className={classNames(
                'action',
                mutation.isLoading && 'active loading'
              )}
              onClick={handleSetMainWorkspace}>
              {f('workspace.setAsMainWorkspace')}
            </div>
          </li>
        )}
        {workspaces?.map((workspace) => (
          <li key={workspace._id}>
            <NavLink to={getWorkspaceInstancePath(workspace._id)}>
              <div className="w-full flex items-center gap-2">
                <span className="flex-none text-xs text-accent">
                  {f('workspace.switchTo')}
                </span>
                <WorkspaceAvatar
                  title={workspace.title}
                  className="flex-none w-6 text-base"
                />
                <span className="flex-auto text-ellipsis overflow-hidden whitespace-nowrap font-bold text-lg">
                  {workspace.title}
                </span>
              </div>
            </NavLink>
          </li>
        ))}
        <div className="from-base-100 pointer-events-none sticky bottom-0 flex h-12 bg-gradient-to-t to-transparent" />
      </Scrollbars>
    </ul>
  );
}

export default observer(WorkspaceMenu);

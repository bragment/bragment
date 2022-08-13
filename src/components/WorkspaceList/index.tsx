import { memo } from 'react';
import { IWorkspace } from '../../libs/client/types';

interface IWorkspaceListProps {
  title?: React.ReactNode;
  workspaces?: IWorkspace[];
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  renderWorkspace: (project: IWorkspace, index: number) => React.ReactNode;
}

function WorkspaceList(props: IWorkspaceListProps) {
  const { icon, title, workspaces, actions, renderWorkspace } = props;

  return (
    <div className="w-full p-6">
      {title && (
        <div className="w-full h-14 mb-2 flex items-center gap-3">
          {icon && <div className="flex-none">{icon}</div>}
          <div className="flex-auto font-bold text-lg">{title}</div>
          {actions && (
            <div className="flex-none flex items-center gap-3">{actions}</div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {workspaces?.map(renderWorkspace)}
      </div>
    </div>
  );
}

export default memo(WorkspaceList);

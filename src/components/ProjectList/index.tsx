import { memo } from 'react';
import { IProject } from '../../libs/client/types';

interface IProjectListProps {
  title?: React.ReactNode;
  projects?: IProject[];
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  renderProject: (project: IProject, index: number) => React.ReactNode;
}

function ProjectList(props: IProjectListProps) {
  const { icon, title, projects, actions, renderProject } = props;

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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {projects?.map(renderProject)}
      </div>
    </div>
  );
}

export default memo(ProjectList);

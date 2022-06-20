import { memo } from 'react';
import { IProject, IWorkspace } from '../../libs/client/types';
import Creator from './Creator';
import Workspace from './Workspace';
import styles from './index.module.scss';

interface IWorkspaceListProps {
  workspaces: IWorkspace[];
  projects: IProject[];
  withCreator?: boolean;
}

function WorkspaceList(props: IWorkspaceListProps) {
  const { workspaces, projects, withCreator } = props;
  return (
    <div className={styles.listWrapper}>
      {workspaces.map((workspace) => (
        <Workspace
          workspace={workspace}
          projects={projects.filter(
            (project) => project.workspace === workspace._id
          )}
          key={workspace._id}
        />
      ))}
      {withCreator !== false && <Creator />}
    </div>
  );
}

export default memo(WorkspaceList);

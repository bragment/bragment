import { memo } from 'react';
import { IProject, IWorkspace } from '../../libs/client/types';
import ProjectList from '../ProjectList';
import styles from './index.module.scss';

interface IWorkspaceProps {
  workspace: IWorkspace;
  projects: IProject[];
}

function Workspace(props: IWorkspaceProps) {
  const { workspace, projects } = props;
  return (
    <div className={styles.itemWrapper}>
      <p className={styles.title}>{workspace.title}</p>
      <ProjectList label={workspace.title} projects={projects} />
    </div>
  );
}

export default memo(Workspace);

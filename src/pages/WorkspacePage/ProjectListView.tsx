import {
  GlobalOutlined,
  LoadingOutlined,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Empty } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../components/hooks';
import ProjectList from '../../components/ProjectList';
import {
  EProjectVisibility,
  IProject,
  IWorkspace,
} from '../../libs/client/types';
import { useWorkspaceProjectListQuery } from '../../libs/react-query';
import styles from './index.module.scss';

interface IProjectListViewProps {
  workspace: IWorkspace;
  isOwner?: boolean;
}

function ProjectListView(props: IProjectListViewProps) {
  const { workspace } = props;
  const { setCreateProjectDialogVisible } = useDialogStore();
  const { current: currentUser } = useUserStore();
  const isOwner = workspace.owner.users.includes(currentUser?._id || '');

  const [privateProjects, setPrivateProjects] = useState<IProject[]>([]);
  const [publicProjects, setPublicProjects] = useState<IProject[]>([]);
  const { data: projects, isLoading } = useWorkspaceProjectListQuery(
    workspace._id,
    !!currentUser
  );
  const f = useFormatMessage();

  const handelCreateNewProject = () => {
    setCreateProjectDialogVisible(true);
  };

  useEffect(() => {
    const privateList: IProject[] = [];
    const publicList: IProject[] = [];
    projects?.forEach((project) => {
      if (project.visibility === EProjectVisibility.Private) {
        privateList.push(project);
      } else if (project.visibility === EProjectVisibility.Public) {
        publicList.push(project);
      }
    });
    setPrivateProjects(privateList);
    setPublicProjects(publicList);
  }, [projects]);

  return (
    <Scrollbars autoHide>
      <div className={styles.projectListView}>
        {isLoading && (
          <ProjectList
            loading
            icon={<LoadingOutlined />}
            title={f('loading')}
          />
        )}
        {!!privateProjects.length && (
          <ProjectList
            icon={<LockOutlined />}
            title={f('privateProjects')}
            projects={privateProjects}
          />
        )}
        {!!publicProjects.length && (
          <ProjectList
            icon={<GlobalOutlined />}
            title={f('publicProjects')}
            projects={publicProjects}
          />
        )}
        {projects && projects.length === 0 && (
          <Empty description={f('haveNoProject')}>
            {isOwner && (
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={handelCreateNewProject}>
                {f('createProject')}
              </Button>
            )}
          </Empty>
        )}
      </div>
    </Scrollbars>
  );
}

export default observer(ProjectListView);

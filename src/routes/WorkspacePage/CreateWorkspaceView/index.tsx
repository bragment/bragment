import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useFormatMessage, useUserStore } from '../../../components/hooks';
import { IWorkspace } from '../../../libs/client/types';
import { useUpdateMyDataMutation } from '../../../libs/react-query';
import { getWorkspaceProjectListPath } from '../../helpers';
import { useNavigateToPage } from '../../hooks';
import CreateWorkspaceForm from './CreateWorkspaceForm';

function CreateWorkspaceView() {
  const f = useFormatMessage();
  const { me, updateMe } = useUserStore();
  const { mutateAsync } = useUpdateMyDataMutation();
  const navigateTo = useNavigateToPage();

  const handleFinish = useCallback(
    async (workspace: IWorkspace) => {
      const id = workspace._id;
      navigateTo(getWorkspaceProjectListPath(id), { replace: true });
      if (!me?.mainWorkspace) {
        const user = await mutateAsync({
          mainWorkspace: id,
        });
        updateMe(user);
      }
    },
    [me, mutateAsync, navigateTo, updateMe]
  );

  return (
    <div
      className={classNames(
        'bg-base-200 text-base-content',
        'w-full h-full min-h-[36rem] flex items-center justify-center'
      )}>
      <div className="w-96 mx-3 pb-16">
        <label className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          {f('workspace.createWorkspace')}
        </label>
        <CreateWorkspaceForm onFinish={handleFinish} />
      </div>
    </div>
  );
}

export default observer(CreateWorkspaceView);

import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useFormatMessage, useUserStore } from '../../../components/hooks';
import { IWorkspace } from '../../../libs/client/types';
import { useUpdateMyDataMutation } from '../../../libs/react-query';
import { useNavigateWorkspaceInstancePage } from '../../hooks';
import CreateWorkspaceForm from './CreateWorkspaceForm';

function CreateWorkspaceView() {
  const f = useFormatMessage();
  const { me, updateMe } = useUserStore();
  const userUpdateMutation = useUpdateMyDataMutation();
  const navigate = useNavigateWorkspaceInstancePage();

  const handleFinish = useCallback(
    async (workspace: IWorkspace) => {
      const id = workspace._id;
      navigate(id, { replace: true });
      if (!me?.mainWorkspace) {
        const user = await userUpdateMutation.mutateAsync({
          mainWorkspace: id,
        });
        updateMe(user);
      }
    },
    [me, userUpdateMutation, navigate, updateMe]
  );

  return (
    <div
      className={classNames(
        'bg-base-200 text-base-content',
        'w-full h-full min-h-[36rem] flex items-center justify-center'
      )}>
      <div className="w-96 mx-3 pb-16">
        <label className="font-bold text-3xl">
          {f('workspace.createWorkspace')}
        </label>
        <CreateWorkspaceForm onFinish={handleFinish} />
      </div>
    </div>
  );
}

export default observer(CreateWorkspaceView);

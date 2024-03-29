import classNames from 'classnames';
import { memo } from 'react';
import { HiOutlineFolderAdd, HiOutlinePlus } from 'react-icons/hi';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';
import PrimaryButton from '../../../components/PrimaryButton';

interface IProjectEmptyPromptProps {
  creatable?: boolean;
}

function ProjectEmptyPrompt(props: IProjectEmptyPromptProps) {
  const { creatable } = props;
  const f = useFormatMessage();
  const { setCreateProjectDialogVisible } = useDialogStore();
  const handleCreate = () => setCreateProjectDialogVisible(true);

  return (
    <div className={classNames('hero', 'min-h-[36rem]')}>
      <div className={classNames('hero-content', 'text-center')}>
        <div className="max-w-md flex flex-col items-center justify-center gap-3">
          <HiOutlineFolderAdd className="text-8xl font-bold text-purple-600" />
          <h1 className="text-2xl font-bold">{f('workspace.noProjects')}</h1>
          <p>{f('workspace.getProjectStarted')}</p>
          {creatable && (
            <PrimaryButton
              fromColor="from-violet-500"
              toColor="to-rose-500"
              onClick={handleCreate}>
              <HiOutlinePlus className="text-lg mr-3 " />
              {f('workspace.createProject')}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectEmptyPrompt);

import classNames from 'classnames';
import { memo } from 'react';
import { HiOutlinePlus, HiOutlineViewGrid } from 'react-icons/hi';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';

interface IEmptyViewProps {
  creatable?: boolean;
}

function EmptyView(props: IEmptyViewProps) {
  const { creatable } = props;
  const f = useFormatMessage();
  const { setCreateProjectDialogVisible } = useDialogStore();
  const handleCreate = () => setCreateProjectDialogVisible(true);

  return (
    <div className={classNames('hero', 'min-h-[36rem]')}>
      <div className={classNames('hero-content', 'text-center')}>
        <div className="max-w-md flex flex-col items-center justify-center gap-3">
          <HiOutlineViewGrid className="text-6xl font-bold text-primary" />
          <h1 className="text-2xl font-bold">{f('workspace.noProjects')}</h1>
          <p>{f('workspace.getProjectStarted')}</p>
          {creatable && (
            <button className="btn btn-primary" onClick={handleCreate}>
              <HiOutlinePlus className="text-lg mr-3" />
              {f('workspace.createProject')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(EmptyView);

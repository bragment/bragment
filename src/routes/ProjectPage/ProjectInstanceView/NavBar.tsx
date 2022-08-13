import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../components/hooks';
import { useProjectQuery } from '../../../libs/react-query';

interface INavBarProps {
  className?: string;
  prefix?: React.ReactNode;
}

function NavBar(props: INavBarProps) {
  const { className, prefix } = props;
  const { me } = useUserStore();
  const { projectId = '' } = useParams();
  const { data: project } = useProjectQuery(projectId, !!(me && projectId));
  const title = project ? (
    project.title
  ) : (
    <div
      className={classNames(
        'bg-base-content',
        'w-48 h-7 rounded animate-pulse'
      )}
    />
  );

  return (
    <header className={classNames('navbar', 'gap-3 z-30', className)}>
      <div className="flex-none">{prefix}</div>
      <div className="flex-auto font-bold text-xl capitalize">{title}</div>
    </header>
  );
}

export default observer(NavBar);

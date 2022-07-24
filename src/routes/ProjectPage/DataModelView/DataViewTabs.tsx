import classNames from 'classnames';
import { memo, useMemo } from 'react';
import {
  HiOutlineTable,
  HiOutlineViewBoards,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from 'react-icons/hi';
import { NavLink, useParams } from 'react-router-dom';
import { EDataViewType, IProjectDataView } from '../../../libs/client/types';
import { getProjectDataViewPath } from '../../helpers';

interface IDataViewTabsProps {
  views?: IProjectDataView[];
}

function DataViewTabs(props: IDataViewTabsProps) {
  const { views } = props;
  const { projectId = '', modelId = '' } = useParams();

  const iconRecord = useMemo(
    () => ({
      [EDataViewType.Board]: <HiOutlineTable />,
      [EDataViewType.Table]: <HiOutlineViewBoards />,
      [EDataViewType.Gallery]: <HiOutlineViewGrid />,
      [EDataViewType.List]: <HiOutlineViewList />,
    }),
    []
  );

  return (
    <div
      className={classNames(
        'tabs tabs-boxed',
        'h-12 inline-block whitespace-nowrap'
      )}>
      {views?.map((view) => (
        <NavLink
          key={view._id}
          to={getProjectDataViewPath(projectId, modelId, view._id)}
          className={({ isActive }) =>
            classNames('tab', 'h-10 pl-10 relative', isActive && 'tab-active')
          }>
          <span className="absolute top-2.5 left-3.5 text-xl">
            {iconRecord[view.type]}
          </span>
          {view.title}
        </NavLink>
      ))}
    </div>
  );
}

export default memo(DataViewTabs);

import classNames from 'classnames';
import { memo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { dataViewTypeRecord } from '../../components/CreateDataViewButton/config';
import { IProjectDataView } from '../../libs/client/types';
import { getProjectDataViewPath } from '../helpers';

interface IDataViewTabsProps {
  views?: IProjectDataView[];
}

function DataViewTabs(props: IDataViewTabsProps) {
  const { views } = props;
  const { projectId = '', modelId = '' } = useParams();

  return (
    <div
      className={classNames(
        'tabs tabs-boxed',
        'h-12 inline-block whitespace-nowrap'
      )}>
      {views?.map((view) => {
        const Icon = dataViewTypeRecord[view.type]?.Icon;
        return (
          <NavLink
            key={view._id}
            to={getProjectDataViewPath(projectId, modelId, view._id)}
            className={({ isActive }) =>
              classNames('tab', 'h-10 pl-10 relative', isActive && 'tab-active')
            }>
            <span className="absolute top-2.5 left-3.5 text-xl">
              {Icon && <Icon />}
            </span>
            {view.title}
          </NavLink>
        );
      })}
    </div>
  );
}

export default memo(DataViewTabs);

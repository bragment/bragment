import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import { HiLogin, HiLogout } from 'react-icons/hi';
import { Outlet, useParams } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer';
import { setProjectFields } from '../../../fields';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '../../../libs/react-query';
import DataModelCollapse from '../DataModelCollapse';
import styles from './index.module.scss';

function ProjectInstanceView() {
  const [checked, setChecked] = useState(true);
  const expanded = checked;
  const handleCheckboxChange = () => setChecked((old) => !old);
  const { projectId = '', modelId = '' } = useParams();
  const { data: project } = useProjectQuery(projectId, true, true);
  // NOTE: prefetch for data view
  useProjectDataRecordListQuery(projectId, true, true);

  useEffect(() => {
    setProjectFields(project?.fields || []);
  }, [project]);

  return (
    <div className={classNames('w-full h-full flex', styles.wrapper)}>
      <aside
        className={classNames(
          'bg-base-200 text-base-content',
          'flex-none relative border-r border-base-300',
          expanded ? 'w-80' : 'w-0'
        )}>
        <ScrollContainer autoHide style={{ overflowX: 'hidden' }}>
          <header
            className={classNames(
              'navbar bg-base-200 text-base-content',
              'p-4 bg-opacity-70 backdrop-blur',
              'sticky top-0 z-30'
            )}>
            <div className="flex-auto font-bold text-xl capitalize">
              {project?.title}
            </div>
          </header>
          <div className="p-4">
            <DataModelCollapse
              projectId={projectId}
              modelId={modelId}
              project={project}
            />
          </div>
          <div className="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
        </ScrollContainer>
        <label
          className={classNames(
            'btn btn-ghost swap swap-rotate',
            'absolute top-2 -right-16 z-20 text-xl'
          )}>
          <input
            type="checkbox"
            checked={expanded}
            onChange={handleCheckboxChange}
          />
          <HiLogin className={classNames('swap-on')} />
          <HiLogout className={classNames('swap-off')} />
        </label>
      </aside>
      <main
        className={classNames('bg-base-100 text-base-content', 'flex-auto')}>
        <ScrollContainer autoHide>
          <Outlet />
        </ScrollContainer>
      </main>
    </div>
  );
}

export default memo(ProjectInstanceView);

import { Collapse, CollapseProps } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiChevronRight, HiPlus } from 'react-icons/hi2';
import CreateDataViewDropdown from '../../../components/CreateDataViewDropdown';
import {
  IProject,
  IProjectDataModel,
  IProjectDataView,
} from '../../../libs/client/types';
import { disableScrollContainerByChildElement } from '../../../libs/utils';
import { stopEventPropagation } from '../../../utils';
import { getProjectDataViewPath } from '../../helpers';
import { useNavigateToPage } from '../../hooks';
import DataViewMenu from './DataViewMenu';
import styles from './index.module.scss';

const { Panel } = Collapse;

interface IDataModelCollapseProps {
  projectId: string;
  model: IProjectDataModel;
  views?: IProjectDataView[];
}

function DataModelCollapse(props: IDataModelCollapseProps) {
  const { projectId, model, views = [] } = props;
  const modelId = model._id;
  const noViews = !views.length;
  const extraDivRef = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigateTo = useNavigateToPage();
  const handleCreateViewFinish = useCallback(
    (data: IProject) => {
      const view = data.views[0];
      navigateTo(getProjectDataViewPath(projectId, view.model, view._id));
    },
    [projectId, navigateTo]
  );
  const handleDropdownVisibleChange = useCallback((visible: boolean) => {
    setDropdownVisible(visible);
  }, []);

  const renderExpandIcon = useCallback<
    Exclude<CollapseProps['expandIcon'], undefined>
  >(({ isActive }) => {
    return (
      <div
        className={classNames(
          '!text-lg',
          isActive && 'rotate-90 transform-gpu'
        )}>
        <HiChevronRight />
      </div>
    );
  }, []);

  useEffect(() => {
    if (dropdownVisible) {
      return disableScrollContainerByChildElement(extraDivRef.current);
    }
  }, [dropdownVisible]);

  return (
    <Collapse
      className={styles.wrapper}
      defaultActiveKey={[model._id]}
      ghost
      collapsible={noViews ? 'disabled' : undefined}
      expandIcon={renderExpandIcon}>
      <Panel
        key={model._id}
        showArrow={!noViews}
        header={
          <div
            className={classNames(
              '!text-base font-medium',
              'text-ellipsis overflow-hidden whitespace-nowrap'
            )}>
            {model.title}
          </div>
        }
        extra={
          <div
            ref={extraDivRef}
            className={classNames(dropdownVisible && '!block')}
            onClick={stopEventPropagation}>
            <CreateDataViewDropdown
              projectId={projectId}
              modelId={modelId}
              existingViews={views}
              onFinish={handleCreateViewFinish}
              onVisibleChange={handleDropdownVisibleChange}>
              <button className="btn btn-ghost btn-square btn-sm">
                <HiPlus className="text-lg" />
              </button>
            </CreateDataViewDropdown>
          </div>
        }>
        <DataViewMenu projectId={projectId} views={views} />
      </Panel>
    </Collapse>
  );
}

export default observer(DataModelCollapse);

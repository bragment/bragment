import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';
import {
  LuChevronLeftSquare,
  LuChevronRightSquare,
  LuEyeOff,
  LuPin,
  LuPinOff,
} from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
  useUpdateProjectDataViewMutation,
} from '../../../libs/react-query';
import CreateFieldForm from './CreateFieldForm';
import { useFormatMessage } from '@/components/hooks';
import { getViewRenderer } from '@/libs/core/view-renderers';
import {
  IColumnHeaderMenuItem,
  IViewProps,
} from '@/libs/core/view-renderers/types';
import {
  getViewFieldWidth,
  getViewLeftPinnedFields,
  getViewVisibleFields,
} from '@/libs/core/view-renderers/utils';
import {
  checkIfLeftMovable,
  checkIfPinned,
  checkIfRightMovable,
  moveLeft,
  moveRight,
  pinLeft,
  unpin,
} from '@/libs/radix-ui/data-table/utils';

function DataView() {
  const f = useFormatMessage();
  const { mutateAsync: updateViewMutateAsync } =
    useUpdateProjectDataViewMutation();
  const { projectId = '', viewId = '' } = useParams();
  const { data: records } = useProjectDataRecordListQuery(
    projectId,
    true,
    true
  );
  const { data: project } = useProjectQuery(projectId, true, true);
  const view = project?.views.find((el) => el._id === viewId);

  const headerMenuItems = useMemo<IColumnHeaderMenuItem[]>(
    () => [
      {
        key: 'tableView.moveLeft',
        title: f('tableView.moveLeft'),
        Icon: LuChevronLeftSquare,
        disabled: (...args) => !checkIfLeftMovable(...args),
        onSelect: moveLeft,
      },
      {
        key: 'tableView.moveRight',
        title: f('tableView.moveRight'),
        Icon: LuChevronRightSquare,
        disabled: (...args) => !checkIfRightMovable(...args),
        onSelect: moveRight,
      },
      {
        key: 'tableView.pin',
        title: f('tableView.pin'),
        hidden: (header) => !!checkIfPinned(header),
        Icon: LuPin,
        onSelect: pinLeft,
      },
      {
        key: 'tableView.unpin',
        title: f('tableView.unpin'),
        hidden: (header) => !checkIfPinned(header),
        Icon: LuPinOff,
        onSelect: unpin,
      },
      {
        key: 'tableView.hide',
        title: f('tableView.hide'),
        Icon: LuEyeOff,
        onSelect: (header) => header.column.toggleVisibility(),
      },
    ],
    [f]
  );

  const handleFieldWidthChange = useCallback<
    NonNullable<IViewProps['onFieldWidthChange']>
  >(
    (table, columnId) => {
      const width = getViewFieldWidth(table, columnId);
      if (width) {
        updateViewMutateAsync({
          projectId,
          viewId,
          fieldWidth: { [columnId]: width },
        });
      }
    },
    [projectId, viewId, updateViewMutateAsync]
  );

  const handleVisibleFieldsChange = useCallback<
    NonNullable<IViewProps['onVisibleFieldsChange']>
  >(
    (table) => {
      const visibleFields = getViewVisibleFields(table);
      const leftPinnedFields = getViewLeftPinnedFields(table);
      updateViewMutateAsync({
        projectId,
        viewId,
        visibleFields,
        leftPinnedFields,
      });
    },
    [projectId, viewId, updateViewMutateAsync]
  );

  if (!project || !view || !records) {
    return null;
  }

  const { View } = getViewRenderer(view.type);

  return (
    <View
      project={project}
      view={view}
      records={records}
      headerMenuItems={headerMenuItems}
      CreateFieldForm={CreateFieldForm}
      onFieldWidthChange={handleFieldWidthChange}
      onVisibleFieldsChange={handleVisibleFieldsChange}
    />
  );
}
export default observer(DataView);

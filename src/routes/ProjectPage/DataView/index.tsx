import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';
import {
  LuChevronLeftSquare,
  LuChevronRightSquare,
  LuEyeOff,
  LuKey,
  LuPin,
  LuPinOff,
} from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
  useUpdateProjectDataModelMutation,
  useUpdateProjectDataViewMutation,
} from '../../../libs/react-query';
import CreateFieldForm from './CreateFieldForm';
import CreateRecordInput from './CreateRecordInput';
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
  const { mutateAsync: updateModelMutateAsync } =
    useUpdateProjectDataModelMutation();
  const { mutateAsync: updateViewMutateAsync } =
    useUpdateProjectDataViewMutation();
  const { projectId = '', modelId = '', viewId = '' } = useParams();
  const { data: records } = useProjectDataRecordListQuery(
    projectId,
    true,
    true
  );
  const { data: project } = useProjectQuery(projectId, true, true);
  const view = project?.views.find((el) => el._id === viewId);
  const model = project?.models.find((el) => el._id === modelId);
  const mainFieldId = model?.mainField;

  const headerMenuItems = useMemo<IColumnHeaderMenuItem[]>(
    () => [
      {
        key: 'dataView.setAsMainField',
        title: f('dataView.setAsMainField'),
        Icon: LuKey,
        disabled: (header) => header.column.id === mainFieldId,
        onSelect: (header) => {
          updateModelMutateAsync({
            projectId,
            modelId,
            mainField: header.column.id,
          });
        },
      },
      {
        key: 'dataView.moveLeft',
        title: f('dataView.moveLeft'),
        Icon: LuChevronLeftSquare,
        disabled: (header, table) => !checkIfLeftMovable(header, table),
        onSelect: moveLeft,
      },
      {
        key: 'dataView.moveRight',
        title: f('dataView.moveRight'),
        Icon: LuChevronRightSquare,
        disabled: (header, table) => !checkIfRightMovable(header, table),
        onSelect: moveRight,
      },
      {
        key: 'dataView.pin',
        title: f('dataView.pin'),
        Icon: LuPin,
        hidden: (header) => !!checkIfPinned(header),
        onSelect: pinLeft,
      },
      {
        key: 'dataView.unpin',
        title: f('dataView.unpin'),
        Icon: LuPinOff,
        hidden: (header) => !checkIfPinned(header),
        onSelect: unpin,
      },
      {
        key: 'dataView.hide',
        title: f('dataView.hide'),
        Icon: LuEyeOff,
        onSelect: (header) => header.column.toggleVisibility(),
      },
    ],
    [mainFieldId, projectId, modelId, updateModelMutateAsync, f]
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

  if (!project || !model || !view || !records || model._id !== view.model) {
    // TODO: give some tips
    return null;
  }

  const { View } = getViewRenderer(view.type);

  return (
    <View
      project={project}
      model={model}
      view={view}
      records={records}
      headerMenuItems={headerMenuItems}
      CreateFieldForm={CreateFieldForm}
      CreateRecordInput={CreateRecordInput}
      onFieldWidthChange={handleFieldWidthChange}
      onVisibleFieldsChange={handleVisibleFieldsChange}
    />
  );
}
export default observer(DataView);

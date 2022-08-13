import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { observer } from 'mobx-react';
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  IProject,
  IProjectDataField,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
} from '../../libs/client/types';
import { useUpdateProjectDataModelMutation } from '../../libs/react-query';
import BodyRow from './BodyRow';
import HeadRow from './HeadRow';
import { createColumns } from './helpers';
import TailRow from './TailRow';

interface ITableViewProps {
  project: IProject;
  model: IProjectDataModel;
  view: IProjectDataView;
  fields: IProjectDataField[];
  records: IProjectDataRecord[];
}

function TableView(props: ITableViewProps) {
  const { project, model, view, fields, records } = props;
  const scrollBarRef = useRef<Scrollbars>(null);
  const updateModelMutation = useUpdateProjectDataModelMutation();
  const mainFieldId = model.mainField || fields[0]?._id;
  const modelFields = useMemo(
    () => fields.filter((field) => field.model === model._id),
    [fields, model]
  );
  const modelRecords = useMemo(
    () => records.filter((record) => record.model === model._id),
    [records, model]
  );

  const handleCreateDateFieldFinish = useCallback(
    (data: IProject) => {
      const { activeElement } = document;
      const field = data.fields[0];
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
        setTimeout(() => scrollBarRef.current?.scrollToRight());
      }
      if (field && !model.mainField) {
        updateModelMutation.mutate({
          projectId: project._id,
          modelId: model._id,
          mainField: field._id,
        });
      }
    },
    [project, model, updateModelMutation]
  );

  useLayoutEffect(() => {
    scrollBarRef.current?.scrollToTop();
    scrollBarRef.current?.scrollToLeft();
  }, [view._id]);

  const columns = useMemo(
    () => createColumns(fields, mainFieldId),
    [fields, mainFieldId]
  );

  const table = useReactTable({
    data: modelRecords,
    columns,
    state: {
      columnPinning: { left: [mainFieldId] },
    },
    getCoreRowModel: getCoreRowModel(),
  });
  const headerGroups = table.getHeaderGroups();
  const rowModel = table.getRowModel();
  return (
    <Scrollbars ref={scrollBarRef}>
      {headerGroups.map((headerGroup) => (
        <HeadRow
          key={view._id}
          headerGroup={headerGroup}
          projectId={project._id}
          modelId={model._id}
          modelFields={modelFields}
          onCreateDateFieldFinish={handleCreateDateFieldFinish}
        />
      ))}
      {rowModel.rows.map((row) => (
        <BodyRow
          key={row.id}
          index={row.index}
          row={row}
          borderedBottom={row.index < rowModel.rows.length - 1}
        />
      ))}

      {modelFields && (
        <TailRow
          projectId={project._id}
          modelId={model._id}
          mainFieldId={mainFieldId}
          modelFields={modelFields}
          borderedTop={rowModel.rows.length > 0}
          borderedBottom
        />
      )}
    </Scrollbars>
  );
}
export default observer(TableView);

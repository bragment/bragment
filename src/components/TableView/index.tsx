import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  IProject,
  IProjectDataField,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
} from '../../libs/client/types';
import { useUpdateProjectDataModelMutation } from '../../libs/react-query';
import ScrollContainer from '../ScrollContainer';
import BodyRow from './BodyRow';
import { ControlRow } from './ControlRow';
import HeadRow from './HeadRow';
import {
  createColumns,
  getColumnCanGlobalFilter,
  globalFilterFn,
} from './helpers';
import TailRow from './TailRow';
import { IGlobalFilter } from './types';
import styles from './index.module.scss';

interface ITableViewProps {
  project: IProject;
  model: IProjectDataModel;
  view: IProjectDataView;
  fields: IProjectDataField[];
  records: IProjectDataRecord[];
}

function TableView(props: ITableViewProps) {
  const { project, model, view, fields, records } = props;
  const [globalFilter, setGlobalFilter] = useState<IGlobalFilter>({
    updatedAt: new Date().toISOString(),
    keywords: [],
  });
  const scrollBarRef = useRef<Scrollbars>(null);
  const updateModelMutation = useUpdateProjectDataModelMutation();
  const projectId = project._id;
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

  const handleSearchInputChange = useCallback((value: string) => {
    setGlobalFilter({
      updatedAt: new Date().toISOString(),
      keywords: value
        .split(' ')
        .map((el) => el.trim().toLowerCase())
        .filter((el) => !!el),
    });
  }, []);

  useLayoutEffect(() => {
    scrollBarRef.current?.scrollToTop();
    scrollBarRef.current?.scrollToLeft();
  }, [view._id]);

  const columns = useMemo(
    () => createColumns(projectId, mainFieldId, modelFields),
    [projectId, mainFieldId, modelFields]
  );

  const table = useReactTable({
    data: modelRecords,
    columns,
    state: {
      columnPinning: { left: [mainFieldId] },
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getColumnCanGlobalFilter,
    globalFilterFn,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });
  const headerGroups = table.getHeaderGroups();
  const rowModel = table.getRowModel();

  return (
    <ScrollContainer className={classNames(styles.wrapper)} ref={scrollBarRef}>
      <ControlRow onSearchInputChange={handleSearchInputChange} />
      {headerGroups.map((headerGroup) => (
        <HeadRow
          key={view._id}
          headers={headerGroup.headers}
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
          cells={row.getVisibleCells()}
          borderedBottom={row.index < rowModel.rows.length - 1}
        />
      ))}

      {modelFields.length > 0 && (
        <TailRow
          projectId={project._id}
          modelId={model._id}
          mainFieldId={mainFieldId}
          modelFields={modelFields}
          borderedTop={rowModel.rows.length > 0}
          borderedBottom
        />
      )}
    </ScrollContainer>
  );
}
export default observer(TableView);

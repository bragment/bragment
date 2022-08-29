import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
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
import {
  useUpdateProjectDataModelMutation,
  useUpdateProjectDataViewMutation,
} from '../../libs/react-query';
import { useNestedState } from '../hooks';
import ScrollContainer from '../ScrollContainer';
import BodyRow from './BodyRow';
import ControlRow from './ControlRow';
import HeadRow from './HeadRow';
import {
  createColumns,
  createColumnVisibility,
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
  const scrollBarRef = useRef<Scrollbars>(null);

  const { _id: projectId } = project;
  const { _id: viewId } = view;
  const mainFieldId = model.mainField || fields[0]?._id;
  const modelFields = useMemo(
    () => fields.filter((field) => field.model === model._id),
    [fields, model]
  );
  const modelRecords = useMemo(
    () => records.filter((record) => record.model === model._id),
    [records, model]
  );
  const visibleFieldIds = useMemo(
    () =>
      !view.visibleFields?.length
        ? modelFields.map((el) => el._id)
        : view.visibleFields,
    [view, modelFields]
  );

  const [columnVisibility, setColumnVisibility] = useNestedState(
    createColumnVisibility(
      modelFields.map((el) => el._id),
      visibleFieldIds
    )
  );
  const [columnOrder, setColumnOrder] = useNestedState(visibleFieldIds);
  const [globalFilter, setGlobalFilter] = useState<IGlobalFilter>({
    updatedAt: new Date().toISOString(),
    keywords: [],
  });

  const { mutateAsync: updateModelMutateAsync } =
    useUpdateProjectDataModelMutation();
  const {
    mutateAsync: updateViewMutateAsync,
    // TODO: add loading state
    // isLoading: updateViewLoading,
  } = useUpdateProjectDataViewMutation();

  const updateVisibleFields = useCallback(() => {
    if (columnOrder && !isEqual(columnOrder, visibleFieldIds)) {
      updateViewMutateAsync({ projectId, viewId, visibleFields: columnOrder });
    }
  }, [updateViewMutateAsync, visibleFieldIds, columnOrder, projectId, viewId]);

  const handleCreateDateFieldFinish = useCallback(
    (data: IProject) => {
      const { activeElement } = document;
      const field = data.fields[0];
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
        setTimeout(() => scrollBarRef.current?.scrollToRight());
      }
      if (field && !model.mainField) {
        updateModelMutateAsync({
          projectId: data._id,
          modelId: model._id,
          mainField: field._id,
        });
      }
      if (view.visibleFields?.length) {
        const fieldIds = [...view.visibleFields, field._id];
        updateViewMutateAsync({
          projectId: data._id,
          viewId: view._id,
          visibleFields: fieldIds,
        });
      }
    },
    [updateModelMutateAsync, updateViewMutateAsync, model, view]
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
  const handleVisibilityChange = useCallback(
    (fieldIds: string[]) => {
      setColumnOrder(fieldIds);
      setColumnVisibility(
        createColumnVisibility(
          modelFields.map((el) => el._id),
          fieldIds
        )
      );
    },
    [setColumnOrder, setColumnVisibility, modelFields]
  );

  useLayoutEffect(() => {
    setColumnOrder(visibleFieldIds);
    setColumnVisibility(
      createColumnVisibility(
        modelFields.map((el) => el._id),
        visibleFieldIds
      )
    );
  }, [setColumnOrder, setColumnVisibility, modelFields, visibleFieldIds]);

  useLayoutEffect(() => {
    scrollBarRef.current?.scrollToTop();
    scrollBarRef.current?.scrollToLeft();
  }, [viewId]);

  const columns = useMemo(
    () => createColumns(projectId, mainFieldId, modelFields),
    [projectId, mainFieldId, modelFields]
  );

  const table = useReactTable({
    data: modelRecords,
    columns,
    state: {
      columnPinning: { left: [mainFieldId] },
      columnVisibility,
      columnOrder,
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
      <ControlRow
        mainFieldId={mainFieldId}
        modelFields={modelFields}
        visibleFieldIds={visibleFieldIds}
        onSearchInputChange={handleSearchInputChange}
        onVisibilityChange={handleVisibilityChange}
        onShouldUpdateVisibility={updateVisibleFields}
      />
      {headerGroups.map((headerGroup) => (
        <HeadRow
          key={viewId}
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

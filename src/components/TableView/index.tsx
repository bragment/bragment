import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  EDataFilterConjunction,
  IDataFilter,
  IDataSorter,
  IProject,
  IProjectDataField,
  IProjectDataForm,
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
  convertToColumnFilters,
  convertToColumnSorting,
  convertToColumnVisibility,
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
  forms: IProjectDataForm[];
  records: IProjectDataRecord[];
}

function TableView(props: ITableViewProps) {
  const { project, model, view, fields, forms, records } = props;
  const scrollBarRef = useRef<Scrollbars>(null);

  const { _id: projectId } = project;
  const { _id: modelId } = model;
  const { _id: viewId, filters = [], sorters = [] } = view;
  const modelFields = useMemo(
    () => fields.filter((field) => field.model === modelId),
    [fields, modelId]
  );
  const modelForms = useMemo(
    () => forms.filter((form) => form.model === modelId),
    [forms, modelId]
  );
  const modelRecords = useMemo(
    () => records.filter((record) => record.model === modelId),
    [records, modelId]
  );
  const visibleFieldIds = useMemo(
    () =>
      !view.visibleFields?.length
        ? modelFields.map((el) => el._id)
        : view.visibleFields,
    [view, modelFields]
  );

  const [columnFilters, setColumnFilters] = useNestedState(
    convertToColumnFilters(filters)
  );
  const mainFieldId = model.mainField || modelFields[0]?._id || undefined;
  const columnPinning = useMemo(
    () => ({ left: mainFieldId ? [mainFieldId] : undefined }),
    [mainFieldId]
  );
  const [columnVisibility, setColumnVisibility] = useNestedState(
    convertToColumnVisibility(
      modelFields.map((el) => el._id),
      visibleFieldIds
    )
  );
  const [columnOrder, setColumnOrder] = useNestedState(visibleFieldIds);
  const [globalFilter, setGlobalFilter] = useState<IGlobalFilter>({
    updatedAt: new Date().toISOString(),
    keywords: [],
  });
  const [sorting, setSorting] = useNestedState(convertToColumnSorting(sorters));

  const { mutateAsync: updateModelMutateAsync } =
    useUpdateProjectDataModelMutation();
  const { mutateAsync: updateViewMutateAsync } =
    useUpdateProjectDataViewMutation();

  const updateVisibleFields = useCallback(() => {
    if (columnOrder && !isEqual(columnOrder, visibleFieldIds)) {
      updateViewMutateAsync({ projectId, viewId, visibleFields: columnOrder });
    }
  }, [updateViewMutateAsync, visibleFieldIds, columnOrder, projectId, viewId]);
  const updateSorting = useCallback(() => {
    const newSorters = sorting.map((el) => ({
      field: el.id,
      descending: el.desc,
    }));
    if (!isEqual(sorters, newSorters)) {
      updateViewMutateAsync({ projectId, viewId, sorters: newSorters });
    }
  }, [updateViewMutateAsync, sorters, sorting, projectId, viewId]);
  const updateFilters = useCallback(() => {
    const newFilters = columnFilters.map((el) => ({
      field: el.id,
      operator: el.value.operator,
      operand: el.value.operand,
      conjunction: EDataFilterConjunction.And,
    }));
    if (!isEqual(filters, newFilters)) {
      updateViewMutateAsync({ projectId, viewId, filters: newFilters });
    }
  }, [updateViewMutateAsync, filters, columnFilters, projectId, viewId]);

  const handleCreateDataFieldFinish = useCallback(
    (data: IProject) => {
      const field = data.fields[0];
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
      // NOTE: update the state optimistically, do it after modelFields update
      requestAnimationFrame(() => {
        setColumnOrder((order) => [...order, field._id]);
        setColumnVisibility((visibility) => ({
          ...visibility,
          [field._id]: true,
        }));
        requestAnimationFrame(() => scrollBarRef.current?.scrollToRight());
      });
    },
    [
      setColumnOrder,
      setColumnVisibility,
      updateModelMutateAsync,
      updateViewMutateAsync,
      model,
      view,
    ]
  );

  const handleCreateDataRecordFinish = useCallback(() => {
    requestAnimationFrame(() => scrollBarRef.current?.scrollToBottom());
  }, []);

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
        convertToColumnVisibility(
          modelFields.map((el) => el._id),
          fieldIds
        )
      );
    },
    [setColumnOrder, setColumnVisibility, modelFields]
  );
  const handleSortingChange = useCallback(
    (sorterList: IDataSorter[]) => {
      setSorting(
        sorterList.map((el) => ({ id: el.field, desc: el.descending }))
      );
    },
    [setSorting]
  );
  const handleFiltersChange = useCallback(
    (filterList: IDataFilter[]) => {
      setColumnFilters(
        filterList.map((el) => ({
          id: el.field,
          value: { operator: el.operator, operand: el.operand },
        }))
      );
    },
    [setColumnFilters]
  );

  useLayoutEffect(() => {
    scrollBarRef.current?.scrollToTop();
    scrollBarRef.current?.scrollToLeft();
  }, [viewId]);

  useEffect(() => {
    setColumnOrder(visibleFieldIds);
    setColumnVisibility(
      convertToColumnVisibility(
        modelFields.map((el) => el._id),
        visibleFieldIds
      )
    );
  }, [setColumnOrder, setColumnVisibility, modelFields, visibleFieldIds]);

  useEffect(() => {
    setColumnFilters(convertToColumnFilters(filters));
  }, [setColumnFilters, filters]);

  useEffect(() => {
    setSorting(convertToColumnSorting(sorters));
  }, [setSorting, sorters]);

  const columns = useMemo(
    () => createColumns(projectId, modelFields, mainFieldId),
    [projectId, modelFields, mainFieldId]
  );

  const table = useReactTable({
    data: modelRecords,
    columns,
    state: {
      columnFilters,
      columnOrder,
      columnPinning,
      columnVisibility,
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getColumnCanGlobalFilter,
    globalFilterFn,
    debugTable: process.env.NODE_ENV === 'development',
    debugHeaders: process.env.NODE_ENV === 'development',
    debugColumns: process.env.NODE_ENV === 'development',
  });
  const headerGroups = table.getHeaderGroups();
  const rowModel = table.getRowModel();

  // NOTE: virtual rows
  const rowHeight = 48;
  const rowVirtualizer = useVirtualizer({
    count: rowModel.rows.length,
    overscan: Math.ceil(document.body.clientHeight / rowHeight),
    getScrollElement: () => scrollBarRef.current?.container.firstElementChild,
    estimateSize: () => rowHeight,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none">
        <ControlRow
          projectId={projectId}
          modelId={modelId}
          mainFieldId={mainFieldId}
          modelFields={modelFields}
          modelForms={modelForms}
          visibleFieldIds={visibleFieldIds}
          visibleFieldCount={
            view.visibleFields?.length ? columnOrder.length : undefined
          }
          filters={filters}
          sorters={sorters}
          onFiltersChange={handleFiltersChange}
          onSortingChange={handleSortingChange}
          onVisibilityChange={handleVisibilityChange}
          onShouldUpdateFilters={updateFilters}
          onShouldUpdateSorting={updateSorting}
          onShouldUpdateVisibility={updateVisibleFields}
          onSearchInputChange={handleSearchInputChange}
          onCreateDataFieldFinish={handleCreateDataFieldFinish}
        />
      </div>
      <div className="flex-auto">
        <ScrollContainer
          className={classNames(styles.wrapper)}
          ref={scrollBarRef}>
          {headerGroups.map((headerGroup) => (
            <HeadRow
              key={viewId}
              headers={headerGroup.headers}
              projectId={projectId}
              modelId={modelId}
              modelFields={modelFields}
              onCreateDataFieldFinish={handleCreateDataFieldFinish}
            />
          ))}

          {paddingTop > 0 && <div style={{ height: paddingTop }} />}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const row = rowModel.rows[virtualItem.index];
            return (
              <BodyRow
                key={row.id}
                index={virtualItem.index}
                cells={row.getVisibleCells()}
                borderedTop
              />
            );
          })}
          {paddingBottom > 0 && <div style={{ height: paddingBottom }} />}

          {modelFields.length > 0 && mainFieldId && (
            <TailRow
              projectId={projectId}
              modelId={modelId}
              mainFieldId={mainFieldId}
              modelFields={modelFields}
              borderedTop={rowModel.rows.length > 0}
              borderedBottom
              onCreateDataRecordFinish={handleCreateDataRecordFinish}
            />
          )}
        </ScrollContainer>
      </div>
    </div>
  );
}
export default observer(TableView);

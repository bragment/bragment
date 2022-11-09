import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { IProject, IProjectDataField } from '../../libs/client/types';
import {
  useUpdateProjectDataModelMutation,
  useUpdateProjectDataViewMutation,
} from '../../libs/react-query';
import ScrollContainer from '../ScrollContainer';
import ControlRow from '../TableView/ControlRow';
import { getColumnCanGlobalFilter, globalFilterFn } from '../TableView/helpers';
import { useViewControlProps } from '../TableView/hooks';
import { IViewControlProps } from '../TableView/types';
import Item from './Item';
import styles from './index.module.scss';

function TableView(props: IViewControlProps) {
  const { project, model, view } = props;
  const { _id: projectId } = project;
  const { _id: modelId } = model;
  const { _id: viewId } = view;

  const {
    mainFieldId,
    modelFields,
    modelForms,
    modelRecords,
    filters,
    sorters,
    visibleFieldIds,

    columns,
    columnFilters,
    columnOrder,
    columnPinning,
    columnVisibility,
    globalFilter,
    sorting,
    setColumnOrder,
    setColumnVisibility,

    updateFilters,
    updateSorting,
    updateVisibleFields,
    handleFiltersChange,
    handleSearchInputChange,
    handleSortingChange,
    handleVisibilityChange,
  } = useViewControlProps(props);

  const scrollBarRef = useRef<Scrollbars>(null);
  const { mutateAsync: updateModelMutateAsync } =
    useUpdateProjectDataModelMutation();
  const { mutateAsync: updateViewMutateAsync } =
    useUpdateProjectDataViewMutation();
  const modelFieldMap = useMemo(
    () =>
      modelFields.reduce(
        (prev, el) => prev.set(el._id, el),
        new Map<string, IProjectDataField>()
      ),
    [modelFields]
  );

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

  useLayoutEffect(() => {
    scrollBarRef.current?.scrollToTop();
    scrollBarRef.current?.scrollToLeft();
  }, [viewId]);

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
  const rowModel = table.getRowModel();

  // NOTE: virtual rows
  const rowHeight = 96;
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
      <div className="flex-none border-b border-base-300">
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
          {paddingTop > 0 && <div style={{ height: paddingTop }} />}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const row = rowModel.rows[virtualItem.index];
            const mainField = mainFieldId
              ? modelFieldMap.get(mainFieldId)
              : undefined;
            return (
              <Item
                key={row.id}
                index={virtualItem.index}
                record={row.original}
                mainField={mainField}
              />
            );
          })}
          {paddingBottom > 0 && <div style={{ height: paddingBottom }} />}
        </ScrollContainer>
      </div>
    </div>
  );
}
export default memo(TableView);

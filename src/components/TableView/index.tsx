import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { memo, useLayoutEffect, useMemo, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import ScrollContainer from '../ScrollContainer';
import BodyRow from './BodyRow';
import ControlRow from './ControlRow';
import HeadRow from './HeadRow';
import {
  createColumns,
  getColumnCanGlobalFilter,
  globalFilterFn,
} from './helpers';
import { useViewControlProps } from './hooks';
import TailRow from './TailRow';
import { IViewControlProps } from './types';
import styles from './index.module.scss';

function TableView(props: IViewControlProps) {
  const scrollBarRef = useRef<Scrollbars>(null);
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

    columnFilters,
    columnOrder,
    columnPinning,
    columnVisibility,
    globalFilter,
    sorting,

    updateFilters,
    updateSorting,
    updateVisibleFields,
    handleFiltersChange,
    handleSearchInputChange,
    handleSortingChange,
    handleVisibilityChange,

    handleCreateDataFieldFinish,
    handleCreateDataRecordFinish,
  } = useViewControlProps(props, scrollBarRef);

  const columns = useMemo(
    () => createColumns(projectId, modelFields, mainFieldId),
    [projectId, modelFields, mainFieldId]
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
export default memo(TableView);

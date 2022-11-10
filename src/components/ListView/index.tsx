import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { IProjectDataField } from '../../libs/client/types';
import ScrollContainer from '../ScrollContainer';
import ControlRow from '../TableView/ControlRow';
import { getColumnCanGlobalFilter, globalFilterFn } from '../TableView/helpers';
import { useViewControlProps } from '../TableView/hooks';
import { IViewControlProps } from '../TableView/types';
import { calculateListItemHeight, createColumns } from './helpers';
import Item from './Item';

function getVisibleFields(
  visibleFieldIds: string[],
  modelFields: IProjectDataField[]
) {
  const set = new Set(visibleFieldIds);
  return modelFields.filter((el) => set.has(el._id));
}

function ListView(props: IViewControlProps) {
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
  const rowModel = table.getRowModel();

  // NOTE: virtual items
  const itemHeightRef = useRef<number>(
    24 + calculateListItemHeight(getVisibleFields(visibleFieldIds, modelFields))
  );
  const itemVirtualizer = useVirtualizer({
    count: rowModel.rows.length,
    overscan: Math.ceil(document.body.clientHeight / itemHeightRef.current),
    getScrollElement: () => scrollBarRef.current?.container.firstElementChild,
    estimateSize: () => itemHeightRef.current,
  });
  const virtualRows = itemVirtualizer.getVirtualItems();
  const totalSize = itemVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  useEffect(() => {
    itemHeightRef.current =
      24 +
      calculateListItemHeight(getVisibleFields(visibleFieldIds, modelFields));
  }, [visibleFieldIds, modelFields]);

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
        <ScrollContainer ref={scrollBarRef} withVerticalShadow>
          {paddingTop > 0 && <div style={{ height: paddingTop }} />}
          {itemVirtualizer.getVirtualItems().map((virtualItem) => {
            const row = rowModel.rows[virtualItem.index];
            return (
              <Item
                key={row.id}
                index={virtualItem.index}
                cells={row.getVisibleCells()}
                className={classNames('border-base-300', 'px-6 py-3 border-b')}
              />
            );
          })}
          {paddingBottom > 0 && <div style={{ height: paddingBottom }} />}
        </ScrollContainer>
      </div>
    </div>
  );
}
export default memo(ListView);

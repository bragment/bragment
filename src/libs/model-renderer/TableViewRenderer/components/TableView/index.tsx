import {
  Cell,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Header,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import ScrollContainer from '../../../../../components/ScrollContainer';
import {
  IProject,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../../client/types';
import {
  useUpdateProjectDataModelMutation,
  useUpdateProjectDataViewMutation,
} from '../../../../react-query';
import { IViewProps } from '../../../types';
import { ICurrentViewRenderer } from '../../types';
import BodyRow from './BodyRow';
import ConfigRow from './ConfigRow';
import HeadRow from './HeadRow';
import TailRow from './TailRow';
import { ScrollArea } from '@/libs/radix-ui/scroll-area';
import styles from './index.module.scss';

interface ITableViewProps extends IViewProps {
  renderer: ICurrentViewRenderer;
}

function TableView(props: ITableViewProps) {
  const { renderer, modelFields, modelRecords } = props;
  const scrollBarRef = useRef<Scrollbars>(null);
  const columns = renderer.createColumns(modelFields);
  const {
    fieldFilters,
    fieldOrder,
    fieldPinning,
    fieldSorting,
    fieldVisibility,
  } = renderer.commonStore;
  const { mutateAsync: updateModelMutateAsync } =
    useUpdateProjectDataModelMutation();
  const { mutateAsync: updateViewMutateAsync } =
    useUpdateProjectDataViewMutation();

  const handleCreateDataFieldFinish = useCallback(
    (data: IProject) => {
      const field = data.fields[0];
      const { mainFieldId, unobservable, setFieldOrder, setFieldVisibility } =
        renderer.commonStore;
      const { viewId } = unobservable;
      const view = renderer.commonStore.getViewById(viewId);
      if (field && !mainFieldId) {
        updateModelMutateAsync({
          projectId: data._id,
          modelId: field.model,
          mainField: field._id,
        });
      }
      if (view?.visibleFields?.length) {
        const fieldIds = [...view.visibleFields, field._id];
        updateViewMutateAsync({
          projectId: data._id,
          viewId: view._id,
          visibleFields: fieldIds,
        });
      }
      // NOTE: update the state optimistically, do it after modelFields update
      requestAnimationFrame(() => {
        setFieldOrder([...renderer.commonStore.fieldOrder, field._id]);
        setFieldVisibility({
          ...renderer.commonStore.fieldVisibility,
          [field._id]: true,
        });
        requestAnimationFrame(() => scrollBarRef.current?.scrollToRight());
      });
    },
    [updateModelMutateAsync, updateViewMutateAsync, renderer]
  );

  const handleCreateDataRecordFinish = useCallback(() => {
    requestAnimationFrame(() => scrollBarRef.current?.scrollToBottom());
  }, [scrollBarRef]);

  const table = useReactTable({
    data: modelRecords,
    columns,
    state: {
      columnFilters: fieldFilters,
      columnOrder: fieldOrder,
      columnPinning: fieldPinning,
      columnVisibility: fieldVisibility,
      sorting: fieldSorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    getScrollElement: () =>
      scrollBarRef.current?.container.firstElementChild || null,
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
    <div className="w-full h-full p-1">
      <ScrollArea
        className="h-full"
        viewportClassName="max-w-full max-h-full"
        horizontal
        horizontalBarClassName="h-2"
        verticalBarClassName="w-2"
        vertical>
        {headerGroups.map((group, i) => {
          return (
            <HeadRow
              className="sticky top-0 z-30"
              key={group.id}
              index={i}
              headers={
                group.headers as Header<
                  IProjectDataRecord,
                  IRecordFieldData | undefined
                >[]
              }
              renderer={renderer}
              modelFields={modelFields}
              onCreateDataFieldFinish={handleCreateDataFieldFinish}
            />
          );
        })}
      </ScrollArea>
    </div>
  );

  return (
    <ScrollContainer className={classNames(styles.wrapper)} ref={scrollBarRef}>
      <ConfigRow
        className="sticky left-0"
        modelFields={modelFields}
        renderer={renderer}
        onCreateDataFieldFinish={handleCreateDataFieldFinish}
      />
      {headerGroups.map((group, i) => {
        return (
          <HeadRow
            className="sticky top-0 z-30"
            key={group.id}
            index={i}
            headers={
              group.headers as Header<
                IProjectDataRecord,
                IRecordFieldData | undefined
              >[]
            }
            renderer={renderer}
            modelFields={modelFields}
            onCreateDataFieldFinish={handleCreateDataFieldFinish}
          />
        );
      })}

      {paddingTop > 0 && <div style={{ height: paddingTop }} />}
      {rowModel.rows.map((row, i) => {
        return (
          <BodyRow
            key={row.original._id}
            index={i}
            cells={
              row.getVisibleCells() as Cell<
                IProjectDataRecord,
                IRecordFieldData | undefined
              >[]
            }
            renderer={renderer}
            topBordered
          />
        );
      })}
      {paddingBottom > 0 && <div style={{ height: paddingBottom }} />}

      {modelFields.length > 0 && (
        <TailRow
          modelFields={modelFields}
          renderer={renderer}
          borderedTop={rowModel.rows.length > 0}
          borderedBottom
          onCreateDataRecordFinish={handleCreateDataRecordFinish}
        />
      )}
    </ScrollContainer>
  );
}

export default observer(TableView);

import { createColumnHelper } from '@tanstack/react-table';
import { LuHash } from 'react-icons/lu';
import { getFieldRenderer } from '../../field-renderers';
import AddColumn from './AddColumn';
import Cell from './Cell';
import Header from './Header';
import {
  COLUMN_ADD,
  COLUMN_ADD_WIDTH,
  COLUMN_SEQUENCE,
  COLUMN_SEQUENCE_WIDTH,
  COLUMN_WIDTH_MAX,
  COLUMN_WIDTH_MIN,
  ITableHeaderMenuItem,
} from './types';
import { IProjectDataField, IProjectDataRecord } from '@/libs/client/types';

export function createColumns(
  modelFields: IProjectDataField[],
  options: {
    headerMenuItems: ITableHeaderMenuItem[];
  }
) {
  const helper = createColumnHelper<IProjectDataRecord>();
  return [
    // NOTE: start action columns
    helper.display({
      id: COLUMN_SEQUENCE,
      size: COLUMN_SEQUENCE_WIDTH,
      enableResizing: false,
      header: () => (
        <div className="text-base text-center">
          <LuHash className="inline-block" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-center">{row.index + 1}</div>
      ),
    }),
    // NOTE: data columns
    ...modelFields.map((field) => {
      return helper.accessor(
        (record: IProjectDataRecord) => record.data[field._id],
        {
          id: field._id,
          enableGlobalFilter: false,
          enableResizing: true,
          minSize: COLUMN_WIDTH_MIN,
          maxSize: COLUMN_WIDTH_MAX,
          header: (props) => (
            <Header
              {...props}
              title={field.title}
              menuItems={options.headerMenuItems}
              Icon={getFieldRenderer(field.type).Icon}
            />
          ),
          cell: (props) => <Cell {...props} />,
        }
      );
    }),
    // NOTE: end action columns
    helper.display({
      id: COLUMN_ADD,
      size: COLUMN_ADD_WIDTH,
      enableResizing: false,
      header: (props) => <AddColumn {...props} title="add column" />,
    }),
  ];
}

export function getColumnOrder(
  modelFieldIds: string[],
  visibleFields?: string[]
) {
  return !visibleFields?.length ? modelFieldIds : visibleFields;
}

export function getColumnPinning(
  leftPinning?: string[],
  rightPinning?: string[]
) {
  return {
    left: [COLUMN_SEQUENCE].concat(leftPinning || []),
    right: [COLUMN_ADD].concat(rightPinning || []),
  };
}

export function getColumnVisibility(
  modelFieldIds: string[],
  visibleFields?: string[]
) {
  const visibleIds = getColumnOrder(modelFieldIds, visibleFields);
  const visibleIdSet = new Set(visibleIds);
  return modelFieldIds.reduce<Record<string, boolean>>((prev, el) => {
    prev[el] = visibleIdSet.has(el);
    return prev;
  }, {});
}

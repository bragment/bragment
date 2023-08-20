import { createColumnHelper, HeaderContext } from '@tanstack/react-table';
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
  ICreateColumnListOptions,
} from './types';
import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '@/libs/client/types';

export function createColumnList(
  fields: IProjectDataField[],
  options: ICreateColumnListOptions
) {
  const helper = createColumnHelper<IProjectDataRecord>();
  const { view, headerMenuItems = [] } = options;
  const { fieldWidth = {} } = view;
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
    ...fields.map((field) => {
      return helper.accessor(
        (record: IProjectDataRecord) => record.data[field._id],
        {
          id: field._id,
          enableGlobalFilter: false,
          enableResizing: true,
          size: fieldWidth[field._id],
          minSize: COLUMN_WIDTH_MIN,
          maxSize: COLUMN_WIDTH_MAX,
          header: (props) => (
            <Header
              {...props}
              title={field.title}
              menuItems={headerMenuItems}
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
      header: (props: HeaderContext<IProjectDataRecord, IRecordFieldData>) => (
        <AddColumn {...props} {...options} />
      ),
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
    right: (rightPinning || []).concat([COLUMN_ADD]),
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

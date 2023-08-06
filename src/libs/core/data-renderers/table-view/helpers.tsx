import { createColumnHelper } from '@tanstack/react-table';
import { HiMiniHashtag } from 'react-icons/hi2';
import AddColumn from './AddColumn';
import Cell from './Cell';
import Header from './Header';
import { IProjectDataField, IProjectDataRecord } from '@/libs/client/types';

export function createColumns(modelFields: IProjectDataField[]) {
  const helper = createColumnHelper<IProjectDataRecord>();
  return [
    // NOTE: start action columns
    helper.display({
      id: '_SEQUENCE_',
      size: 64,
      enableResizing: false,
      header: () => (
        <div className="text-base text-center">
          <HiMiniHashtag className="inline-block" />
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
          minSize: 120,
          maxSize: 600,
          header: (props) => <Header title={field.title} {...props} />,
          cell: (props) => <Cell {...props} />,
        }
      );
    }),
    // NOTE: end action columns
    helper.display({
      id: '_ADD_',
      size: 64,
      enableResizing: false,
      header: (props) => <AddColumn title="add column" {...props} />,
    }),
  ];
}

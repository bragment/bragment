import { createColumnHelper } from '@tanstack/react-table';
import {
  EDataFieldType,
  EDataViewType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../client/types';
import AbstractViewRenderer from '../AbstractViewRenderer';
import AbstractFieldRenderer from '../AbstractViewRenderer/AbstractFieldRenderer';
import { filterFn, sortingFn } from '../helpers';
import { IControlProps, IFieldProps, IViewProps } from '../types';
import TableView from './components/TableView';
import MultipleSelectFieldRenderer from './MultipleSelectFieldRenderer';
import SingleLineTextFieldRenderer from './SingleLineTextFieldRenderer';
import TableViewStore from './TableViewStore';

export interface ITableFieldProps extends IFieldProps, IControlProps {}

export default class TableViewRenderer extends AbstractViewRenderer<
  TableViewStore,
  ITableFieldProps
> {
  public static fieldRendererClassMap = new Map<
    string,
    TypeOfClass<AbstractFieldRenderer>
  >();

  public type = EDataViewType.Table;
  public editable = true;
  public store = new TableViewStore();
  public render(props: IViewProps) {
    return <TableView {...props} renderer={this} />;
  }

  public createColumns(modelFields: IProjectDataField[]) {
    const helper = createColumnHelper<IProjectDataRecord>();
    return modelFields.map((field) => {
      const fieldRenderer = this.getFieldRenderer(field);
      return helper.accessor(
        (record: IProjectDataRecord) => record.data[field._id],
        {
          id: field._id,
          enableGlobalFilter: false,
          enableColumnFilter: fieldRenderer?.filterable,
          enableSorting: fieldRenderer?.sortable,
          filterFn: filterFn,
          sortingFn: sortingFn,
        }
      );
    });
  }
}

TableViewRenderer.registerFieldRendererClass(
  EDataFieldType.SingleLineText,
  SingleLineTextFieldRenderer
);

TableViewRenderer.registerFieldRendererClass(
  EDataFieldType.MultipleLineText,
  MultipleSelectFieldRenderer
);

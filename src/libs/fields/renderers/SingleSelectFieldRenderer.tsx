import { HiCheckCircle } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../client/types';
import SingleSelectControl from '../controls/SingleSelectControl';
import { IEditingTableBodyCellProps } from '../types';
import SelectFieldRenderer from './SelectFieldRenderer';

export default class SingleSelectFieldRenderer extends SelectFieldRenderer {
  public name = 'dataField.singleSelect';
  public type = EDataFieldType.SingleSelect;
  public Icon = HiCheckCircle;

  public renderEditingTableBodyCell(
    field: IProjectDataField,
    _record: IProjectDataRecord,
    props: IEditingTableBodyCellProps
  ) {
    return <SingleSelectControl options={field.options} {...props} />;
  }
}

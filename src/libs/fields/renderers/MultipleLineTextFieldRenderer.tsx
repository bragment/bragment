import { HiDocumentText } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../client/types';
import TextAreaControl from '../controls/TextAreaControl';
import { EFieldCategory, IEditingTableBodyCellProps } from '../types';
import FieldRendererBase from './FieldRendererBase';

export default class MultipleLineTextFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.multipleLineText';
  public type = EDataFieldType.MultipleLineText;
  public Icon = HiDocumentText;

  public editable = true;
  public fullWidth = true;

  public renderEditingTableBodyCell(
    field: IProjectDataField,
    record: IProjectDataRecord,
    props: IEditingTableBodyCellProps
  ) {
    return (
      <TextAreaControl
        autoFocus
        defaultValue={this.getStringValue(field, record)}
        {...props}
      />
    );
  }

  public renderFormItem(
    _field: IProjectDataField,
    name: string,
    defaultValue: string,
    props: {
      className?: string;
      bordered?: boolean;
    }
  ) {
    return (
      <TextAreaControl name={name} defaultValue={defaultValue} {...props} />
    );
  }
}

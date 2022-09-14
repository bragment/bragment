import { HiDocumentText } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IRecordFieldData,
} from '../../libs/client/types';
import TextAreaControl from '../controls/TextAreaControl';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class MultipleLineTextFieldRenderer extends BaseFieldRenderer {
  public name = 'dataField.multipleLineText';
  public type = EDataFieldType.MultipleLineText;
  public Icon = HiDocumentText;
  public constructor() {
    super();
    this.editable = true;
  }

  public renderTableCellEditing(
    field: IProjectDataField,
    data: IRecordFieldData,
    props: {
      className?: string;
      loading?: boolean;
      onCancel?: () => void;
      onChange?: (value: string) => void;
    }
  ) {
    return (
      <TextAreaControl
        autoFocus
        defaultValue={this.getValueAsString(field, data)}
        {...props}
      />
    );
  }

  public renderFormItem(
    _field: IProjectDataField,
    name: string,
    defaultValue = '',
    props: {
      className?: string;
    }
  ) {
    return (
      <TextAreaControl name={name} defaultValue={defaultValue} {...props} />
    );
  }
}

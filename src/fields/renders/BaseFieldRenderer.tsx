import { HiAnnotation } from 'react-icons/hi';
import { ILocalMessage } from '../../i18n/types';
import { IProjectDataField, IRecordFieldData } from '../../libs/client/types';
import InputControl from '../controls/InputControl';

export default class BaseFieldRenderer {
  public name = 'baseText';
  public type = 'BASE_TYPE';
  public Icon = HiAnnotation;
  public editable = true;
  public inputType = 'text';
  public fullWidth = true;

  public getInputType(_field: IProjectDataField) {
    return this.inputType;
  }

  public getNameAsMessageId() {
    return this.name as ILocalMessage;
  }

  public getValueAsString(_field: IProjectDataField, data?: IRecordFieldData) {
    return data?.value.toString() || '';
  }

  public renderTableCell(field: IProjectDataField, data?: IRecordFieldData) {
    return (
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        {this.getValueAsString(field, data).slice(0, 128)}
      </div>
    );
  }

  public renderTableCellEditing(
    field: IProjectDataField,
    data?: IRecordFieldData,
    props?: {
      className?: string;
      loading?: boolean;
      onCancel?: () => void;
      onChange?: (value: string) => void;
    }
  ) {
    return (
      <InputControl
        autoFocus
        type={this.getInputType(field)}
        defaultValue={this.getValueAsString(field, data)}
        {...props}
      />
    );
  }

  public renderFormItem(
    field: IProjectDataField,
    name: string,
    defaultValue = '',
    props?: {
      className?: string;
    }
  ) {
    return (
      <InputControl
        type={this.getInputType(field)}
        name={name}
        defaultValue={defaultValue}
        {...props}
      />
    );
  }
}

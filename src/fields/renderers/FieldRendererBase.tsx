import { HiAnnotation } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../libs/client/types';
import InputControl from '../controls/InputControl';
import { EFieldCategory, IResolvablePath } from '../types';

export default class FieldRendererBase {
  public category = EFieldCategory.Basic;
  public type = EDataFieldType.SingleLineText;
  public name = 'dataField.singleLineText';
  public Icon = HiAnnotation;

  public editable = true;
  public fullWidth = true;
  public inputType = 'text';
  public resolvable = false;
  public resolvablePaths: IResolvablePath[] = [];

  public getInputType(_field: IProjectDataField) {
    return this.inputType;
  }

  public getName() {
    return this.name;
  }

  public getData(
    field: IProjectDataField,
    record: IProjectDataRecord
  ): IProjectDataRecord | IRecordFieldData | string | undefined {
    return record.data[field._id];
  }

  public getStringValue(field: IProjectDataField, record: IProjectDataRecord) {
    const data = this.getData(field, record) as IRecordFieldData;
    return data?.value || '';
  }

  public renderTableBodyCellByStringValue(value: string) {
    return (
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        {value.slice(0, 128)}
      </div>
    );
  }

  public renderTableBodyCell(
    field: IProjectDataField,
    record: IProjectDataRecord
  ) {
    return this.renderTableBodyCellByStringValue(
      this.getStringValue(field, record)
    );
  }

  public renderEditingTableBodyCell(
    field: IProjectDataField,
    record: IProjectDataRecord,
    props?: {
      className?: string;
      loading?: boolean;
      bordered?: boolean;
      onCancel?: () => void;
      onChange?: (value: string) => void;
    }
  ) {
    return (
      <InputControl
        autoFocus
        type={this.getInputType(field)}
        defaultValue={this.getStringValue(field, record)}
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
      bordered?: boolean;
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

  public renderCreateFieldExtra(_props: {
    existingFields?: IProjectDataField[];
  }): JSX.Element | null {
    return null;
  }
}

import classNames from 'classnames';
import type { RefObject } from 'react';
import { HiAnnotation } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../client/types';
import InputControl from '../controls/InputControl';
import {
  EFieldCategory,
  ICreateFieldExtraProps,
  ICreateFieldExtraRef,
  IResolvablePath,
} from '../types';

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
  public listItemCellHeight = 32;

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

  public renderListItemCellByStringValue(value: string, main = false) {
    return (
      <div
        className="flex items-center"
        style={{ height: this.listItemCellHeight }}>
        <div
          className={classNames(
            main
              ? 'text-lg font-bold text-base-content'
              : 'text-base text-base-content/80',
            'text-ellipsis overflow-hidden whitespace-nowrap'
          )}>
          {value.slice(0, 256)}
        </div>
      </div>
    );
  }

  public renderListItemCell(
    field: IProjectDataField,
    record: IProjectDataRecord,
    main = false
  ) {
    return this.renderListItemCellByStringValue(
      this.getStringValue(field, record),
      main
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

  public renderCreateFieldExtra(
    _props: ICreateFieldExtraProps,
    _ref: RefObject<ICreateFieldExtraRef>
  ): JSX.Element | null {
    return null;
  }
}

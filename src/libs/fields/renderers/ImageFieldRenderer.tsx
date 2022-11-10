import { HiPhotograph } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../client/types';
import { EFieldCategory } from '../types';
import FieldRendererBase from './FieldRendererBase';

export default class ImageFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.image';
  public type = EDataFieldType.Image;
  public Icon = HiPhotograph;

  public editable = false;
  public fullWidth = true;
  public inputType = 'url';
  public listItemCellHeight = 96;

  public renderTableBodyCellByStringValue(value: string): JSX.Element {
    return (
      <div className="w-full h-full p-1">
        {value && (
          <img
            className="w-full h-full rounded object-cover object-center pointer-events-none"
            loading="lazy"
            src={value}
            alt=""
          />
        )}
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

  public renderListItemCellByStringValue(value: string, _main?: boolean) {
    return (
      <div
        className="w-full p-1"
        style={{ height: this.listItemCellHeight, maxWidth: 160 }}>
        {value && (
          <img
            className="w-full h-full rounded object-cover object-left pointer-events-none"
            loading="lazy"
            src={value}
            alt=""
          />
        )}
      </div>
    );
  }

  public renderListItemCell(
    field: IProjectDataField,
    record: IProjectDataRecord,
    main?: boolean
  ) {
    return this.renderListItemCellByStringValue(
      this.getStringValue(field, record),
      main
    );
  }
}

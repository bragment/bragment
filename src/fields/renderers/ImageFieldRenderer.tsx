import { HiPhotograph } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../libs/client/types';
import LinkWrapper from '../controls/LinkWrapper';
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

  public renderTableBodyCellByStringValue(value: string): JSX.Element {
    return (
      <img
        className="w-full h-full object-cover pointer-events-none"
        src={value}
        alt=""
      />
    );
  }

  public renderTableBodyCell(
    field: IProjectDataField,
    record: IProjectDataRecord
  ) {
    return (
      <LinkWrapper field={field} record={record}>
        {this.renderTableBodyCellByStringValue(
          this.getStringValue(field, record)
        )}
      </LinkWrapper>
    );
  }
}

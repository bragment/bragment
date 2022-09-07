import { HiDocumentText } from 'react-icons/hi';
import { IProjectDataField, IRecordFieldData } from '../../libs/client/types';
import TextAreaControl from '../controls/TextAreaControl';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class MultipleLineTextRenderer extends BaseFieldRenderer {
  public name = 'dataField.multipleLineText';
  public type = 'MULTIPLE_LINE_TEXT';
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
      onCancel?: () => void;
      onChange?: (value: string) => void;
    }
  ) {
    return (
      <TextAreaControl
        defaultValue={this.getValueAsString(field, data)}
        {...props}
      />
    );
  }
}

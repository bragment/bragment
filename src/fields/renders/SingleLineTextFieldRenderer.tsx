import { HiAnnotation } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class SingleLineTextFieldRenderer extends BaseFieldRenderer {
  public name = 'dataField.singleLineText';
  public type = EDataFieldType.SingleLineText;
  public Icon = HiAnnotation;

  public constructor() {
    super();
    this.editable = true;
    this.inputType = 'text';
  }
}

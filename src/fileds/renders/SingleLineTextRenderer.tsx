import { HiAnnotation } from 'react-icons/hi';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class SingleLineTextRenderer extends BaseFieldRenderer {
  public name = 'dataField.singleLineText';
  public type = 'SINGLE_LINE_TEXT';
  public Icon = HiAnnotation;

  public constructor() {
    super();
    this.editable = true;
    this.inputType = 'text';
  }
}

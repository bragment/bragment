import { HiHashtag } from 'react-icons/hi';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class NumberRenderer extends BaseFieldRenderer {
  public name = 'dataField.number';
  public type = 'NUMBER';
  public Icon = HiHashtag;

  public constructor() {
    super();
    this.editable = true;
    this.inputType = 'number';
  }
}

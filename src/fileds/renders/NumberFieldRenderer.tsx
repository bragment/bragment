import { HiHashtag } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class NumberFieldRenderer extends BaseFieldRenderer {
  public name = 'dataField.number';
  public type = EDataFieldType.Number;
  public Icon = HiHashtag;

  public constructor() {
    super();
    this.editable = true;
    this.inputType = 'number';
  }
}

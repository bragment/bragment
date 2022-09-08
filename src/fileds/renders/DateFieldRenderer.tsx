import { HiCalendar } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class DateFieldRenderer extends BaseFieldRenderer {
  public name = 'dataField.date';
  public type = EDataFieldType.Date;
  public Icon = HiCalendar;

  public constructor() {
    super();
    this.editable = true;
    this.inputType = 'date';
  }
}

import { HiCalendar } from 'react-icons/hi';
import { EDataFieldType } from '../../client/types';
import { EFieldCategory } from '../types';
import FieldRendererBase from './FieldRendererBase';

export default class DateFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.date';
  public type = EDataFieldType.Date;
  public Icon = HiCalendar;

  public editable = true;
  public fullWidth = false;
  public inputType = 'date';
}

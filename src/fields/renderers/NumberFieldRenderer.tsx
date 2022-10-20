import { HiHashtag } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import { EFieldCategory } from '../types';
import FieldRendererBase from './FieldRendererBase';

export default class NumberFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.number';
  public type = EDataFieldType.Number;
  public Icon = HiHashtag;

  public editable = true;
  public fullWidth = true;
  public inputType = 'number';
}

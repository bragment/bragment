import { HiHashtag } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import FieldRendererBase from './FieldRendererBase';
import { EFieldCategory } from './types';

export default class NumberFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.number';
  public type = EDataFieldType.Number;
  public Icon = HiHashtag;

  public editable = true;
  public fullWidth = true;
  public inputType = 'number';
}

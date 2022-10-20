import { HiAnnotation } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import { EFieldCategory } from '../types';
import FieldRendererBase from './FieldRendererBase';

export default class SingleLineTextFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.singleLineText';
  public type = EDataFieldType.SingleLineText;
  public Icon = HiAnnotation;

  public editable = true;
  public fullWidth = true;
  public inputType = 'text';
}

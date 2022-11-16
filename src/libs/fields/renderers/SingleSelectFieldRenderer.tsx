import { BiChevronDownCircle } from 'react-icons/bi';
import { EDataFieldType } from '../../client/types';
import SelectFieldRenderer from './SelectFieldRenderer';

export default class SingleSelectFieldRenderer extends SelectFieldRenderer {
  public name = 'dataField.singleSelect';
  public type = EDataFieldType.SingleSelect;
  public Icon = BiChevronDownCircle;
}

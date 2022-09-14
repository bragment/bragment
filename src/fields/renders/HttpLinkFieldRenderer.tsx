import { HiLink } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class HttpLinkFieldRenderer extends BaseFieldRenderer {
  public name = 'dataField.httpLink';
  public type = EDataFieldType.HttpLink;
  public Icon = HiLink;

  public constructor() {
    super();
    this.editable = true;
    this.inputType = 'url';
  }
}

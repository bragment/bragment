import { HiLink } from 'react-icons/hi';
import BaseFieldRenderer from './BaseFieldRenderer';

export default class HttpLinkRenderer extends BaseFieldRenderer {
  public name = 'dataField.httpLink';
  public type = 'HTTP_LINK';
  public Icon = HiLink;

  public constructor() {
    super();
    this.editable = true;
    this.inputType = 'url';
  }
}

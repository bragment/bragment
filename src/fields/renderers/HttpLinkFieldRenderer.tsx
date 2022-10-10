import { HiLink } from 'react-icons/hi';
import { EDataFieldType } from '../../libs/client/types';
import FieldRendererBase from './FieldRendererBase';
import { EFieldCategory, IResolvablePath } from './types';

export default class HttpLinkFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.httpLink';
  public type = EDataFieldType.HttpLink;
  public Icon = HiLink;

  public editable = true;
  public fullWidth = true;
  public inputType = 'url';
  public resolvable = true;
  public resolvablePaths: IResolvablePath[] = [
    { name: 'dataField.title', value: 'title' },
    { name: 'dataField.description', value: 'description' },
  ];
}

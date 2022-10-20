import classNames from 'classnames';
import { HiLink } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../libs/client/types';
import LinkWrapper from '../controls/LinkWrapper';
import { EFieldCategory, IResolvablePath } from '../types';
import FieldRendererBase from './FieldRendererBase';

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
    { name: 'dataField.title', value: 'metadata.title' },
    { name: 'dataField.description', value: 'metadata.description' },
  ];

  public renderTableBodyCellByStringValue(value: string): JSX.Element {
    return (
      <a
        className={classNames(
          'link link-primary',
          'text-ellipsis overflow-hidden whitespace-nowrap'
        )}
        href={value}
        target="_blank"
        rel="noopener noreferrer">
        {value}
      </a>
    );
  }

  public renderTableBodyCell(
    field: IProjectDataField,
    record: IProjectDataRecord
  ) {
    return (
      <LinkWrapper field={field} record={record}>
        {this.renderTableBodyCellByStringValue(
          this.getStringValue(field, record)
        )}
      </LinkWrapper>
    );
  }
}

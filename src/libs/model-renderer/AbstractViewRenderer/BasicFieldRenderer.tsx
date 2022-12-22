import { EDataFieldType } from '../../client/types';
import { IFieldProps } from '../types';
import AbstractFieldRenderer from './AbstractFieldRenderer';

export default class BasicFieldRenderer extends AbstractFieldRenderer<
  null,
  IFieldProps
> {
  public static title = 'dataField.plain';
  public static type = EDataFieldType.Plain;
  public static icon = (<></>);

  public type = EDataFieldType.Plain;
  public editable = false;
  public filterable = false;
  public sortable = false;

  public render(props: IFieldProps) {
    const { data } = props;
    return <span>{(data?.value || '').toString()}</span>;
  }
}

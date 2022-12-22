import { EDataFieldType } from '../../client/types';
import AbstractFieldRenderer from '../AbstractViewRenderer/AbstractFieldRenderer';
import TextField from './components/TextField';
import { ICurrentFieldProps, ICurrentViewStore } from './types';

export default class SingleLineTextFieldRenderer extends AbstractFieldRenderer<
  ICurrentViewStore,
  ICurrentFieldProps
> {
  public type = EDataFieldType.SingleLineText;
  public filterable = true;
  public editable = true;
  public sortable = true;
  public render(props: ICurrentFieldProps) {
    return <TextField {...props} singleLine renderer={this} />;
  }
}

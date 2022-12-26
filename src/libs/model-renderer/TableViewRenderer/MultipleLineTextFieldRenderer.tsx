import { EDataFieldType } from '../../client/types';
import AbstractFieldRenderer from '../AbstractViewRenderer/AbstractFieldRenderer';
import TextField from './components/TextField';
import { ICurrentFieldProps, ICurrentViewStore } from './types';

export default class MultipleLineTextFieldRenderer extends AbstractFieldRenderer<
  ICurrentViewStore,
  ICurrentFieldProps
> {
  public static type = EDataFieldType.MultipleLineText;
  public type = EDataFieldType.MultipleLineText;
  public filterable = true;
  public editable = true;
  public sortable = true;
  public render(props: ICurrentFieldProps) {
    return <TextField {...props} renderer={this} />;
  }
}

import classNames from 'classnames';
import { Option } from 'rc-select';
import { EDataFieldType, IProjectDataField } from '../../client/types';
import {
  generateForegroundColorHexFrom,
  generateOpacityColorHexFrom,
} from '../../color';
import AbstractViewRenderer from '../AbstractViewRenderer';
import AbstractFieldRenderer from '../AbstractViewRenderer/AbstractFieldRenderer';
import SelectField from './components/SelectField';
import { ICurrentFieldProps, ICurrentViewStore } from './types';

export default class MultipleSelectFieldRenderer extends AbstractFieldRenderer<
  ICurrentViewStore,
  ICurrentFieldProps
> {
  public static type = EDataFieldType.MultipleSelect;
  public type = EDataFieldType.MultipleSelect;
  public filterable = true;
  public editable = true;
  public sortable = true;

  public constructor(
    field: IProjectDataField,
    renderer: AbstractViewRenderer<ICurrentViewStore, ICurrentFieldProps>
  ) {
    super(field, renderer);
    this.options = (
      <>
        {field.options?.map((el) => (
          <Option
            key={el._id}
            value={el._id}
            label={el.title}
            className="flex items-center pl-2 pr-3">
            <div
              className={classNames(
                'rounded px-2 border',
                'overflow-hidden text-ellipsis whitespace-nowrap'
              )}
              style={{
                borderColor: el.color,
                backgroundColor: generateOpacityColorHexFrom(el.color),
                color: generateForegroundColorHexFrom(el.color, 0.9),
              }}>
              {el.title}
            </div>
          </Option>
        ))}
      </>
    );
  }

  public render(props: ICurrentFieldProps) {
    return <SelectField {...props} renderer={this} />;
  }
}
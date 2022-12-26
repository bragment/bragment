import classNames from 'classnames';
import { Option } from 'rc-select';
import { EDataFieldType, IProjectDataField } from '../../client/types';
import { generateForegroundColorHexFrom } from '../../color';
import AbstractViewRenderer from '../AbstractViewRenderer';
import AbstractFieldRenderer from '../AbstractViewRenderer/AbstractFieldRenderer';
import SelectField from './components/SelectField';
import { ICurrentFieldProps, ICurrentViewStore } from './types';

export default class SingleSelectFieldRenderer extends AbstractFieldRenderer<
  ICurrentViewStore,
  ICurrentFieldProps
> {
  public static type = EDataFieldType.SingleSelect;
  public type = EDataFieldType.SingleSelect;
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
                'rounded px-2',
                'overflow-hidden text-ellipsis whitespace-nowrap'
              )}
              style={{
                backgroundColor: el.color,
                color: generateForegroundColorHexFrom(el.color),
              }}>
              {el.title}
            </div>
          </Option>
        ))}
      </>
    );
  }

  public render(props: ICurrentFieldProps) {
    return <SelectField {...props} singleValue renderer={this} />;
  }
}

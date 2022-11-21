import { RefObject } from 'react';
import { HiTag } from 'react-icons/hi';
import { EDataFieldType } from '../../../client/types';
import {
  EFieldCategory,
  ICreateFieldExtraProps,
  ICreateFieldExtraRef,
} from '../../types';
import FieldRendererBase from '../FieldRendererBase';
import CreateFieldExtra from './CreateFieldExtra';

export default class SelectFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Basic;
  public name = 'dataField.multipleSelect';
  public type = EDataFieldType.MultipleSelect;
  public Icon = HiTag;

  public editable = true;
  public fullWidth = true;

  public renderCreateFieldExtra(
    _props: ICreateFieldExtraProps,
    ref: RefObject<ICreateFieldExtraRef>
  ) {
    return <CreateFieldExtra ref={ref} />;
  }
}

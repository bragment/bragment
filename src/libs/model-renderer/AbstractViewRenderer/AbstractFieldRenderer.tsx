import { EDataFieldType, IProjectDataField } from '../../client/types';
import { IFieldProps } from '../types';
import type AbstractViewRenderer from './index';

export default abstract class AbstractFieldRenderer<
  S = any,
  P extends IFieldProps = IFieldProps
> {
  public static title: string;
  public static type: EDataFieldType;
  public static icon: React.ReactNode;

  public abstract type: EDataFieldType;
  public abstract editable: boolean;
  public abstract filterable: boolean;
  public abstract sortable: boolean;
  public abstract render(props: P): React.ReactNode;

  public field: IProjectDataField;
  public options: React.ReactNode;
  public viewRenderer: AbstractViewRenderer<S, P>;
  public constructor(
    field: IProjectDataField,
    viewRenderer: AbstractViewRenderer<S, P>
  ) {
    this.field = field;
    this.viewRenderer = viewRenderer;
  }

  public getViewRenderer = () => {
    return this.viewRenderer;
  };

  public getStore = () => {
    return this.viewRenderer.store;
  };

  public getCommonStore = () => {
    return this.viewRenderer.commonStore;
  };
}

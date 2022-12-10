import {
  EDataFieldType,
  EDataViewType,
  IProjectDataField,
} from '../../client/types';
import CommonStore from '../CommonStore';
import { IFieldProps, IViewProps } from '../types';
import AbstractFieldRenderer from './AbstractFieldRenderer';
import BasicFieldRenderer from './BasicFieldRenderer';

export default abstract class AbstractViewRenderer<
  S, // NOTE: custom view store
  F extends IFieldProps = IFieldProps,
  V extends IViewProps = IViewProps
> {
  public static fieldRendererClassMap = new Map<
    string,
    TypeOfClass<AbstractFieldRenderer>
  >();
  public static registerFieldRendererClass(
    type: EDataFieldType,
    FieldRendererClass: TypeOfClass<AbstractFieldRenderer>
  ) {
    this.fieldRendererClassMap.set(type, FieldRendererClass);
  }
  public registerFieldRendererClass(
    type: EDataFieldType,
    FieldRendererClass: TypeOfClass<AbstractFieldRenderer<S, F>>
  ) {
    (this.constructor as typeof AbstractViewRenderer).fieldRendererClassMap.set(
      type,
      FieldRendererClass
    );
  }

  public abstract type: EDataViewType;
  public abstract editable: boolean;
  public abstract store: S;
  public abstract render(props: V): React.ReactNode;

  public commonStore = new CommonStore();
  public fieldRendererMap = new Map<string, AbstractFieldRenderer<S, F>>();
  public createFieldRenderer(field: IProjectDataField) {
    const FieldRendererClass = ((
      this.constructor as typeof AbstractViewRenderer<S>
    ).fieldRendererClassMap.get(field.type) ||
      BasicFieldRenderer) as TypeOfClass<AbstractFieldRenderer<S, F>>;
    return new FieldRendererClass(field, this);
  }
  public getFieldRendererById(id: string) {
    return this.fieldRendererMap.get(id);
  }
  public getFieldRenderer(field: IProjectDataField) {
    let fieldRenderer = this.fieldRendererMap.get(field._id);
    if (fieldRenderer && fieldRenderer.field === field) {
      return fieldRenderer;
    }
    fieldRenderer = this.createFieldRenderer(field);
    this.fieldRendererMap.set(field._id, fieldRenderer);
    return fieldRenderer;
  }

  public updateCommonStoreUnobservableData = (
    data: Partial<CommonStore['unobservable']>
  ) => {
    this.commonStore.unobservable = {
      ...this.commonStore.unobservable,
      ...data,
    };
  };

  public updateCommonStoreViewData = (
    data: Parameters<CommonStore['updateViewData']>[0]
  ) => {
    this.commonStore.updateViewData(data);
  };
}

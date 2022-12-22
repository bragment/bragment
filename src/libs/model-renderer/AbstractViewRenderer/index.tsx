import {
  EDataFieldType,
  EDataViewType,
  IProjectDataField,
} from '../../client/types';
import CommonStore from '../CommonStore';
import { IFieldProps, IViewProps } from '../types';
import AbstractFieldRenderer from './AbstractFieldRenderer';
import BasicFieldRenderer from './BasicFieldRenderer';

export interface IFieldRendererClass {
  new (...args: any[]): AbstractFieldRenderer;
  title: string;
  type: EDataFieldType;
  icon: React.ReactNode;
}

export default abstract class AbstractViewRenderer<
  S, // NOTE: custom view store
  F extends IFieldProps = IFieldProps,
  V extends IViewProps = IViewProps
> {
  public static title: string;
  public static type: EDataViewType;
  public static icon: React.ReactNode;

  public static fieldRendererClassMap = new Map<string, IFieldRendererClass>();
  public static registerFieldRendererClass(
    type: EDataFieldType,
    FieldRendererClass: IFieldRendererClass
  ) {
    this.fieldRendererClassMap.set(type, FieldRendererClass);
  }

  public defaultFieldRendererClass: IFieldRendererClass = BasicFieldRenderer;
  public setDefaultFieldRendererClass(FieldRendererClass: IFieldRendererClass) {
    this.defaultFieldRendererClass = FieldRendererClass;
  }

  public getFieldRendererClassMap() {
    return (this.constructor as typeof AbstractViewRenderer)
      .fieldRendererClassMap;
  }
  public getFieldRendererClassByType(type: EDataFieldType) {
    return (
      this.getFieldRendererClassMap().get(type) ||
      this.defaultFieldRendererClass
    );
  }
  public registerFieldRendererClass(
    type: EDataFieldType,
    FieldRendererClass: IFieldRendererClass
  ) {
    this.getFieldRendererClassMap().set(type, FieldRendererClass);
  }

  public abstract editable: boolean;
  public abstract store: S;
  public abstract render(props: V): React.ReactNode;

  public commonStore = new CommonStore();
  public fieldRendererMap = new Map<string, AbstractFieldRenderer<S, F>>();

  public createFieldRenderer(field: IProjectDataField) {
    const FieldRendererClass = this.getFieldRendererClassByType(field.type);
    return new FieldRendererClass(field, this);
  }
  public getFieldRendererById(id: string) {
    return this.fieldRendererMap.get(id);
  }
  public getFieldRenderer(
    field: IProjectDataField
  ): AbstractFieldRenderer<S, F> {
    let fieldRenderer = this.fieldRendererMap.get(field._id);
    if (fieldRenderer && fieldRenderer.field === field) {
      return fieldRenderer;
    }
    fieldRenderer = this.createFieldRenderer(field);
    this.fieldRendererMap.set(field._id, fieldRenderer);
    return fieldRenderer;
  }
  public getType() {
    return (this.constructor as typeof AbstractViewRenderer).type;
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

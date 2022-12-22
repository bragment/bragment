import React from 'react';
import { EDataViewType, IProjectDataView } from '../client/types';
import AbstractViewRenderer from './AbstractViewRenderer';
import TableViewRenderer from './TableViewRenderer';

interface IViewRendererClass {
  new (...args: any[]): AbstractViewRenderer<any>;
  title: string;
  type: EDataViewType;
  icon: React.ReactNode;
}

export default class ModelRenderer {
  public static viewRendererClassMap = new Map<string, IViewRendererClass>();
  public static registerViewRendererClass(
    type: EDataViewType,
    ViewRendererClass: IViewRendererClass
  ) {
    this.viewRendererClassMap.set(type, ViewRendererClass);
  }

  public defaultViewRendererClass: IViewRendererClass = TableViewRenderer;
  public setDefaultViewRendererClass(ViewRendererClass: IViewRendererClass) {
    this.defaultViewRendererClass = ViewRendererClass;
  }

  public getViewRendererClassMap() {
    return (this.constructor as typeof ModelRenderer).viewRendererClassMap;
  }

  public getViewRendererClassByType(type: EDataViewType) {
    return (
      this.getViewRendererClassMap().get(type) || this.defaultViewRendererClass
    );
  }

  public registerViewRendererClass(
    type: EDataViewType,
    ViewRendererClass: IViewRendererClass
  ) {
    this.getViewRendererClassMap().set(type, ViewRendererClass);
  }

  public createViewRenderer(view: IProjectDataView) {
    const ViewRendererClass = this.getViewRendererClassByType(view.type);
    return new ViewRendererClass();
  }

  public getAllViewRendererClasses() {
    return Array.from(this.getViewRendererClassMap().values());
  }

  public getViewRendererIconByType(type: EDataViewType) {
    return this.getViewRendererClassByType(type)?.icon;
  }
}

ModelRenderer.registerViewRendererClass(
  TableViewRenderer.type,
  TableViewRenderer
);

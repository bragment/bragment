import {
  ColumnFilter,
  ColumnPinningState,
  ColumnSort,
} from '@tanstack/react-table';
import isEqual from 'lodash/isEqual';
import { makeAutoObservable } from 'mobx';
import {
  IProjectDataField,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
} from '../client/types';
import {
  convertToFieldFilters,
  convertToFieldSorting,
  convertToFieldVisibility,
} from './helpers';

interface IUnobservableData {
  projectId: string;
  modelId: string;
  viewId: string;
  models: Record<string, IProjectDataModel>;
  views: Record<string, IProjectDataView>;
  fields: Record<string, IProjectDataField>;
  records: Record<string, IProjectDataRecord>;
}

export default class CommonStore {
  public unobservable: IUnobservableData = {
    projectId: '',
    modelId: '',
    viewId: '',
    models: {},
    views: {},
    fields: {},
    records: {},
  };
  public fieldFilters: ColumnFilter[] = [];
  public fieldOrder: string[] = [];
  public fieldPinning: ColumnPinningState = {};
  public fieldSorting: ColumnSort[] = [];
  public fieldVisibility: Record<string, boolean> = {};
  public searchWords: string[] = [];

  public mainFieldId: string | undefined = undefined;

  public constructor() {
    makeAutoObservable(this, {
      unobservable: false,
    });
  }

  public getViewById = (viewId: string) => {
    return this.unobservable.views[viewId];
  };

  public setMainFieldId = (fieldId: string | undefined) => {
    this.mainFieldId = fieldId;
  };

  public setFieldFilters = (filters: ColumnFilter[]) => {
    if (!isEqual(this.fieldFilters, filters)) {
      this.fieldFilters = filters;
    }
  };

  public setFieldOrder = (order: string[]) => {
    if (!isEqual(this.fieldOrder, order)) {
      this.fieldOrder = order;
    }
  };

  public setFieldPinning = (pinning: ColumnPinningState) => {
    if (!isEqual(this.fieldPinning, pinning)) {
      this.fieldPinning = pinning;
    }
  };

  public setFieldSorting = (sorting: ColumnSort[]) => {
    if (!isEqual(this.fieldSorting, sorting)) {
      this.fieldSorting = sorting;
    }
  };

  public setFieldVisibility = (visibility: Record<string, boolean>) => {
    if (!isEqual(this.fieldVisibility, visibility)) {
      this.fieldVisibility = visibility;
    }
  };

  public setSearchWords = (words: string[]) => {
    if (!isEqual(this.searchWords, words)) {
      this.searchWords = words;
    }
  };

  public setSearchWordsByString = (str: string) => {
    this.setSearchWords(
      str
        .split(' ')
        .map((el) => el.trim())
        .filter((el) => !!el)
    );
  };

  public updateViewData = (data: {
    view: IProjectDataView;
    modelFields: IProjectDataField[];
    mainFieldId?: string;
  }) => {
    const { view, modelFields, mainFieldId } = data;
    const { filters = [], sorters = [], visibleFields } = view;
    const modelFieldIds = modelFields.map((el) => el._id);
    const visibleFieldIds = !visibleFields?.length
      ? modelFieldIds
      : visibleFields;

    this.setMainFieldId(mainFieldId);

    this.setFieldFilters(convertToFieldFilters(filters));
    this.setFieldOrder(visibleFieldIds);
    this.setFieldPinning({
      left: mainFieldId ? [mainFieldId] : undefined,
    });
    this.setFieldSorting(convertToFieldSorting(sorters));
    this.setFieldVisibility(
      convertToFieldVisibility(modelFieldIds, visibleFieldIds)
    );
  };
}

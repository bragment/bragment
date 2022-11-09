import {
  IProject,
  IProjectDataField,
  IProjectDataForm,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
} from '../../libs/client/types';

export interface IGlobalFilter {
  updatedAt: string;
  keywords: string[];
}

export interface IViewControlProps {
  project: IProject;
  model: IProjectDataModel;
  view: IProjectDataView;
  fields: IProjectDataField[];
  forms: IProjectDataForm[];
  records: IProjectDataRecord[];
}

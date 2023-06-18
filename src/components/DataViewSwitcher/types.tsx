import { IProjectDataModel, IProjectDataView } from '@/libs/client/types';

export interface IModelViewGroup {
  model: IProjectDataModel;
  views: IProjectDataView[];
}

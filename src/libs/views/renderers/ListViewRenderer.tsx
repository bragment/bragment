import { HiOutlineViewList } from 'react-icons/hi';
import ListView from '../../../components/ListView';
import {
  EDataViewType,
  IProject,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
} from '../../client/types';
import ViewRendererBase from './ViewRendererBase';

export default class ListViewRenderer extends ViewRendererBase {
  public type = EDataViewType.List;
  public name = 'dataView.list';
  public Icon = HiOutlineViewList;

  public render(
    project: IProject,
    model: IProjectDataModel,
    view: IProjectDataView,
    records: IProjectDataRecord[]
  ) {
    return (
      <ListView
        project={project}
        model={model}
        view={view}
        fields={project.fields}
        forms={project.forms}
        records={records}
      />
    );
  }
}

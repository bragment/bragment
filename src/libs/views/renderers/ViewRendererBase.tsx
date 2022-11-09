import { HiOutlineTable } from 'react-icons/hi';
import TableView from '../../../components/TableView';
import {
  EDataViewType,
  IProject,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
} from '../../client/types';

export default class ViewRendererBase {
  public type = EDataViewType.Table;
  public name = 'dataView.table';
  public Icon = HiOutlineTable;

  public getName() {
    return this.name;
  }

  public render(
    project: IProject,
    model: IProjectDataModel,
    view: IProjectDataView,
    records: IProjectDataRecord[]
  ) {
    return (
      <TableView
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

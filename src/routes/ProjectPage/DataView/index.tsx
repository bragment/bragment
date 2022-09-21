import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import TableView from '../../../components/TableView';
import { EDataViewType } from '../../../libs/client/types';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '../../../libs/react-query';

function DataView() {
  const { projectId = '', viewId = '' } = useParams();
  const { data: records } = useProjectDataRecordListQuery(
    projectId,
    true,
    true
  );
  const { data: project } = useProjectQuery(projectId, true, true);
  const view = project?.views.find((el) => el._id === viewId);
  const model = project?.models.find((el) => el._id === view?.model);
  const fields = project?.fields;
  const forms = project?.forms;

  if (project && model && view && fields && forms && records) {
    if (view.type === EDataViewType.Table) {
      return (
        <TableView
          project={project}
          model={model}
          view={view}
          fields={fields}
          forms={forms}
          records={records}
        />
      );
    }
  }

  return null;
}
export default observer(DataView);

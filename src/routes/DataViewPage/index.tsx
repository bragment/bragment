import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import TableView from '../../components/TableView';
import { EDataViewType } from '../../libs/client/types';
import {
  useProjectDataRecordQuery,
  useProjectQuery,
} from '../../libs/react-query';

function DataViewPage() {
  const { me } = useUserStore();
  const { projectId = '', viewId = '' } = useParams();
  const { data: project } = useProjectQuery(projectId, !!(me && projectId));
  const { data: records } = useProjectDataRecordQuery(
    projectId,
    !!(me && projectId)
  );
  const view = project?.views.find((el) => el._id === viewId);
  const model = project?.models.find((el) => el._id === view?.model);
  const fields = project?.fields.filter((field) => field.model === view?.model);

  if (project && model && view && fields && records) {
    if (view.type === EDataViewType.Table) {
      return (
        <TableView
          project={project}
          model={model}
          view={view}
          fields={fields}
          records={records}
        />
      );
    }
  }
  return null;
}
export default observer(DataViewPage);

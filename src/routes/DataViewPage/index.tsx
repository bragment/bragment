import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import TableView from '../../components/TableView';
import { EDataViewType } from '../../libs/client/types';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '../../libs/react-query';
import Skeleton from './Skeleton';

function DataViewPage() {
  const { me } = useUserStore();
  const { projectId = '', viewId = '' } = useParams();
  const { data: project, isError: projectQueryError } = useProjectQuery(
    projectId,
    !!(me && projectId)
  );
  const { data: records, isError: recordListQueryError } =
    useProjectDataRecordListQuery(projectId, !!(me && projectId));
  const view = project?.views.find((el) => el._id === viewId);
  const model = project?.models.find((el) => el._id === view?.model);
  const fields = project?.fields;

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
  if (projectQueryError || recordListQueryError) {
    // NOTE: handle request error
    return null;
  }

  return <Skeleton />;
}
export default observer(DataViewPage);

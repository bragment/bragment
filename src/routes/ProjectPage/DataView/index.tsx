import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import TableView from '../../../components/TableView';
import { EDataViewType } from '../../../libs/client/types';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '../../../libs/react-query';
import NoFieldPrompt from './NoFieldPrompt';

function DataView() {
  const { projectId = '', modelId = '', viewId = '' } = useParams();
  const { data: records } = useProjectDataRecordListQuery(
    projectId,
    true,
    true
  );
  const { data: project } = useProjectQuery(projectId, true, true);
  const view = project?.views.find((el) => el._id === viewId);
  const model = project?.models.find((el) => el._id === modelId);
  const fields = project?.fields;
  const forms = project?.forms;

  if (project && model && view && fields && forms && records) {
    const hasFields = fields.some((field) => field.model === modelId);

    if (!hasFields) {
      return <NoFieldPrompt projectId={projectId} modelId={modelId} />;
    }

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

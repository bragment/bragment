import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '../../../libs/react-query';
import { getViewRenderer } from '../../../libs/views';
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

  if (project && model && view && records) {
    const hasFields = project.fields.some((field) => field.model === modelId);

    if (!hasFields) {
      return <NoFieldPrompt projectId={projectId} modelId={modelId} />;
    }
    const viewRenderer = getViewRenderer(view.type);
    if (viewRenderer) {
      return viewRenderer.render(project, model, view, records);
    }
  }

  return null;
}
export default observer(DataView);

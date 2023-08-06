import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '../../../libs/react-query';
import { TableView } from '@/libs/core/data-renderers/table-view';

function DataView() {
  const { projectId = '', modelId = '', viewId = '' } = useParams();
  const { data: records } = useProjectDataRecordListQuery(
    projectId,
    true,
    true
  );
  const { data: project } = useProjectQuery(projectId, true, true);
  const view = project?.views.find((el) => el._id === viewId);
  const modelFields = useMemo(
    () => project?.fields.filter((el) => el.model === modelId) || [],
    [modelId, project?.fields]
  );
  const modelRecords = useMemo(
    () => records?.filter((el) => el.model === modelId) || [],
    [records, modelId]
  );

  if (!view) {
    return null;
  }

  return (
    <TableView
      view={view}
      modelFields={modelFields}
      modelRecords={modelRecords}
    />
  );
}
export default observer(DataView);

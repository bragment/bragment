import { observer } from 'mobx-react';
import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IProjectDataView } from '../../../libs/client/types';
import TableViewRenderer from '../../../libs/model-renderer/TableViewRenderer';
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

  const mainFieldId = useMemo(() => model?.mainField, [model]);
  const modelFields = useMemo(
    () => project?.fields.filter((el) => el.model === modelId) || [],
    [modelId, project?.fields]
  );
  const modelRecords = useMemo(
    () => records?.filter((el) => el.model === modelId) || [],
    [records, modelId]
  );
  const rendererRef = useRef<TableViewRenderer | null>(null);
  const renderer = useMemo(() => {
    if (!view) {
      rendererRef.current = null;
    } else if (
      !rendererRef.current ||
      rendererRef.current.getType() !== view.type
    ) {
      rendererRef.current = new TableViewRenderer();
      rendererRef.current.commonStore.updateViewData({
        view,
        modelFields,
        mainFieldId,
      });
    }
    return rendererRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  useMemo(() => {
    rendererRef.current?.updateCommonStoreUnobservableData({
      projectId,
      modelId,
      viewId,
    });
  }, [projectId, modelId, viewId]);
  useMemo(() => {
    rendererRef.current?.updateCommonStoreUnobservableData({
      views:
        project?.views.reduce<Record<string, IProjectDataView>>((prev, el) => {
          prev[el._id] = el;
          return prev;
        }, {}) || {},
    });
  }, [project?.views]);
  useEffect(() => {
    if (view) {
      rendererRef.current?.updateCommonStoreViewData({
        view,
        modelFields,
        mainFieldId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelFields, mainFieldId]);

  if (project && model && view && records) {
    const hasFields = project.fields.some((field) => field.model === modelId);
    if (!hasFields) {
      return <NoFieldPrompt projectId={projectId} modelId={modelId} />;
    }

    return renderer && renderer.render({ modelFields, modelRecords });
  }

  return null;
}
export default observer(DataView);

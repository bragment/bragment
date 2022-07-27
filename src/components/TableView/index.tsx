import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  IProject,
  IProjectDataModel,
  IProjectDataView,
} from '../../libs/client/types';
import { useUpdateProjectDataModelMutation } from '../../libs/react-query';
import Header from './Header';

interface ITableViewProps {
  project: IProject;
  model: IProjectDataModel;
  view: IProjectDataView;
}

function TableView(props: ITableViewProps) {
  const { project, model, view } = props;
  const scrollBarRef = useRef<Scrollbars>(null);
  const updateModelMutation = useUpdateProjectDataModelMutation();

  const handleCreateDateFieldFinish = useCallback(
    (data: IProject) => {
      const { activeElement } = document;
      const field = data.fields[0];
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
        setTimeout(() => scrollBarRef.current?.scrollToRight());
      }
      if (field && !model.mainField) {
        updateModelMutation.mutate({
          projectId: project._id,
          modelId: model._id,
          mainField: field._id,
        });
      }
    },
    [project, model, updateModelMutation]
  );

  return (
    <Scrollbars ref={scrollBarRef}>
      <Header
        projectId={project._id}
        fields={project.fields.filter((field) => field.model === view.model)}
        modelId={view.model}
        view={view}
        onCreateDateFieldFinish={handleCreateDateFieldFinish}
      />
    </Scrollbars>
  );
}
export default observer(TableView);

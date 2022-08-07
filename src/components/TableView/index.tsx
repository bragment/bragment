import { observer } from 'mobx-react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  IProject,
  IProjectDataField,
  IProjectDataModel,
  IProjectDataView,
} from '../../libs/client/types';
import { useUpdateProjectDataModelMutation } from '../../libs/react-query';
import Footer from './Footer';
import Header from './Header';

interface ITableViewProps {
  project: IProject;
  model: IProjectDataModel;
  view: IProjectDataView;
  fields: IProjectDataField[];
}

function TableView(props: ITableViewProps) {
  const { project, model, view, fields } = props;
  const scrollBarRef = useRef<Scrollbars>(null);
  const updateModelMutation = useUpdateProjectDataModelMutation();
  const mainFieldId = model.mainField || fields[0]?._id;
  const mainField = fields.find((field) => field._id === mainFieldId);

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

  useLayoutEffect(() => {
    scrollBarRef.current?.scrollToTop();
    scrollBarRef.current?.scrollToLeft();
  }, [view._id]);

  return (
    <Scrollbars ref={scrollBarRef}>
      <Header
        projectId={project._id}
        modelId={model._id}
        mainField={mainField}
        view={view}
        fields={fields}
        onCreateDateFieldFinish={handleCreateDateFieldFinish}
      />
      {mainField && (
        <Footer
          projectId={project._id}
          modelId={model._id}
          mainField={mainField}
          fields={fields}
        />
      )}
    </Scrollbars>
  );
}
export default observer(TableView);

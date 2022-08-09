import { observer } from 'mobx-react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  IProject,
  IProjectDataField,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
} from '../../libs/client/types';
import { useUpdateProjectDataModelMutation } from '../../libs/react-query';
import BodyRow from './BodyRow';
import HeadRow from './HeadRow';
import TailRow from './TailRow';

interface ITableViewProps {
  project: IProject;
  model: IProjectDataModel;
  view: IProjectDataView;
  fields: IProjectDataField[];
  records: IProjectDataRecord[];
}

function TableView(props: ITableViewProps) {
  const { project, model, view, fields, records } = props;
  const scrollBarRef = useRef<Scrollbars>(null);
  const updateModelMutation = useUpdateProjectDataModelMutation();
  const mainFieldId = model.mainField || fields[0]?._id;
  const mainField = fields.find((field) => field._id === mainFieldId);
  const visibleFields = fields.filter(
    (field) =>
      !view.hiddenFields.includes(field._id) && field._id !== mainField?._id
  );
  const visibleRecords = records.filter((record) => record.model === model._id);

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
      <HeadRow
        projectId={project._id}
        modelId={model._id}
        fields={fields}
        mainField={mainField}
        visibleFields={visibleFields}
        onCreateDateFieldFinish={handleCreateDateFieldFinish}
      />
      {mainField &&
        visibleRecords.map((record, i) => (
          <BodyRow
            key={record._id}
            index={i}
            record={record}
            mainField={mainField}
            visibleFields={visibleFields}
            borderedBottom={i < visibleRecords.length - 1}
          />
        ))}
      {mainField && (
        <TailRow
          projectId={project._id}
          modelId={model._id}
          mainField={mainField}
          fields={fields}
          borderedTop={visibleRecords.length > 0}
          borderedBottom
        />
      )}
    </Scrollbars>
  );
}
export default observer(TableView);

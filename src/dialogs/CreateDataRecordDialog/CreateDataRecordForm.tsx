import { forwardRef, memo, Ref, useImperativeHandle, useRef } from 'react';
import { IProjectDataRecord } from '../../libs/client/types';
import { IInnerDataFormItem } from '../CreateDataFormDialog/CreateForm';
import FormItem from './FormItem';

interface ICreateDataRecordFormProps {
  className?: string;
  projectId: string;
  modelId: string;
  title: string;
  items: IInnerDataFormItem[];
}

export interface ICreateDataRecordFormRef {
  getData: () => Partial<IProjectDataRecord> | undefined;
}
const DATA_PREFIX = 'data.';
function CreateDataRecordForm(
  props: ICreateDataRecordFormProps,
  ref: Ref<ICreateDataRecordFormRef>
) {
  const { projectId, modelId, title, items } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  useImperativeHandle(
    ref,
    () => ({
      getData: () => {
        const form = formRef.current;
        if (!form) {
          return undefined;
        }
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const record: any = { data: {} };
        entries.forEach(([key, value]) => {
          if (key.startsWith(DATA_PREFIX)) {
            record.data[key.slice(DATA_PREFIX.length)] = { value };
          } else {
            record[key] = value;
          }
        });
        return record as Partial<IProjectDataRecord>;
      },
    }),
    []
  );

  return (
    <form className="form-control" ref={formRef} onSubmit={handleSubmit}>
      <div className="px-4 py-6 flex justify-center w-full">
        <div className="px-4 text-3xl font-bold">{title}</div>
      </div>
      <input type="hidden" name="project" value={projectId} />
      <input type="hidden" name="model" value={modelId} />
      <div>
        {items.map((item, index) => (
          <FormItem
            key={item.field._id}
            index={index}
            name={DATA_PREFIX + item.field._id}
            item={item}
          />
        ))}
      </div>
      <br />
    </form>
  );
}

export default memo(forwardRef(CreateDataRecordForm));

import classNames from 'classnames';
import {
  forwardRef,
  memo,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useFormatMessage } from '../../components/hooks';
import { IProjectDataRecord } from '../../libs/client/types';
import { IInnerDataFormItem } from '../CreateDataFormDialog/CreateForm';
import FormItem from './FormItem';

interface ICreateDataRecordFormProps {
  className?: string;
  projectId: string;
  modelId: string;
  title: string;
  items: IInnerDataFormItem[];
  hiddenItems?: IInnerDataFormItem[];
}

export interface ICreateDataRecordFormRef {
  getData: () => Partial<IProjectDataRecord> | undefined;
}
const DATA_PREFIX = 'data.';
function CreateDataRecordForm(
  props: ICreateDataRecordFormProps,
  ref: Ref<ICreateDataRecordFormRef>
) {
  const { projectId, modelId, title, items, hiddenItems } = props;
  const [hiddenItemsVisible, setHiddenItemsVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const f = useFormatMessage();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleHiddenItemVisibleChange = () => {
    setHiddenItemsVisible((value) => !value);
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
      {!!hiddenItems?.length && (
        <div>
          <label className={classNames('swap', 'pl-4 mb-6')}>
            <input
              type="checkbox"
              checked={hiddenItemsVisible}
              onChange={handleHiddenItemVisibleChange}
            />
            <div
              className={classNames(
                'swap-on bg-base-content/10',
                'px-4 py-3 flex items-center rounded-lg'
              )}>
              <HiChevronUp className="text-xl mr-2" />
              {f('project.hideOtherFields')}
            </div>
            <div
              className={classNames(
                'swap-off bg-base-content/10',
                'px-4 py-3 flex items-center rounded-lg'
              )}>
              <HiChevronDown className="text-xl mr-2" />
              {f('project.showOtherFields')}
            </div>
          </label>
          {hiddenItemsVisible && (
            <div>
              {hiddenItems.map((item, index) => (
                <FormItem
                  key={item.field._id}
                  index={items.length + index}
                  name={DATA_PREFIX + item.field._id}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <br />
    </form>
  );
}

export default memo(forwardRef(CreateDataRecordForm));

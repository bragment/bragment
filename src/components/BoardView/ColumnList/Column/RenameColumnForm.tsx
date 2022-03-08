import { Form, Input } from 'antd';
import { memo, KeyboardEvent as ReactKeyboardEvent, useMemo } from 'react';
import { useRenameProjectColumnMutation } from '../../../../graphql';

import styles from './index.module.scss';

interface IRenameColumnFormProps {
  objectId: string;
  defaultTitle: string;
  onFinish?: () => void;
  onCancel?: () => void;
}

interface IRenameColumnFormData {
  title: string;
}

function RenameColumnForm(props: IRenameColumnFormProps) {
  const { objectId, defaultTitle, onCancel, onFinish } = props;
  const [form] = Form.useForm<IRenameColumnFormData>();
  const initialFormValues = useMemo<IRenameColumnFormData>(
    () => ({
      title: defaultTitle,
    }),
    [defaultTitle]
  );
  const [updateProjectColumn] = useRenameProjectColumnMutation();

  const handleSubmit = async () => {
    const fields = form.getFieldsValue();
    const title = fields.title.trim();
    if (!objectId || !title || title === defaultTitle) {
      return;
    }
    const input = {
      id: objectId,
      fields,
    };
    await updateProjectColumn({ variables: { input } });
    if (onFinish) {
      onFinish();
    }
  };

  const handleInputBlur = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <Form
      name="RenameProjectColumnForm"
      form={form}
      className={styles.form}
      initialValues={initialFormValues}>
      <Form.Item name="title">
        <Input
          autoFocus
          autoComplete="off"
          className="middle-input-without-affix"
          placeholder={defaultTitle}
          onBlur={handleInputBlur}
          onPressEnter={handleSubmit}
          onKeyDown={handleInputKeyDown}
        />
      </Form.Item>
    </Form>
  );
}

export default memo(RenameColumnForm);

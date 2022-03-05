import { CloseOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import debounce from 'lodash.debounce';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { generateDefaultCreateProjectItemFieldsInput } from '../../../../api/apollo';
import { useCreateProjectItemMutation } from '../../../../graphql';
import { useFormatMessage } from '../../../hooks';
import { calculateColumnFooterTextAreaMaxRows } from '../../helpers';
import styles from './index.module.scss';

export interface ICreateCardFormProps {
  columnId: string;
  projectId: string;
  onFinish?: () => void;
  onCancel?: () => void;
  onHeightChange?: (height: number) => void;
}

interface ICreateCardFormData {
  content: string;
}

function CreateCardForm(props: ICreateCardFormProps) {
  const { projectId, columnId, onCancel, onFinish, onHeightChange } = props;
  const f = useFormatMessage();
  const inputRef = useRef<TextAreaRef>(null);
  const inputHeightRef = useRef<number>(0);
  const [inputMaxRows, setInputMaxRows] = useState(
    calculateColumnFooterTextAreaMaxRows()
  );
  const [form] = Form.useForm<ICreateCardFormData>();
  const initialFormValues = useMemo<ICreateCardFormData>(
    () => ({
      content: '',
    }),
    []
  );
  const [addProjectItem, { loading }] = useCreateProjectItemMutation();

  const handleTitleChange = () => {
    const inputHeight =
      inputRef.current?.resizableTextArea?.textArea.clientHeight;
    if (inputHeightRef.current !== inputHeight) {
      inputHeightRef.current = inputHeight || 0;
      if (onHeightChange) {
        // NOTE: formHeight = inputHeight + 16
        onHeightChange(inputHeightRef.current + 69);
      }
    }
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const content = values.content.trim();
    if (!columnId || !content) {
      return;
    }
    const fields = generateDefaultCreateProjectItemFieldsInput(
      projectId,
      columnId,
      content
    );
    const input = {
      fields,
      columnId,
    };
    await addProjectItem({ variables: { input } });
    form.resetFields();
    if (onFinish) {
      onFinish();
    }
  };

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setInputMaxRows(calculateColumnFooterTextAreaMaxRows());
    }, 60);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <Form
      name="CreateProjectItemForm"
      form={form}
      className={styles.form}
      initialValues={initialFormValues}>
      <Form.Item name="content">
        <TextArea
          ref={inputRef}
          autoFocus
          className="middle-input-without-affix"
          placeholder={f('inputCardTitle')}
          autoSize={{ minRows: 1, maxRows: inputMaxRows }}
          onChange={handleTitleChange}
        />
      </Form.Item>
      <div className={styles.actions}>
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          {f('addCard')}
        </Button>
        <CloseOutlined
          style={{ display: loading ? 'none' : undefined }}
          className={styles.close}
          onClick={onCancel}
        />
      </div>
    </Form>
  );
}

export default memo(CreateCardForm);

import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { memo, useEffect, useMemo } from 'react';
import { useCreateProjectColumnMutation } from '../../../graphql';
import { useFormatMessage } from '../../hooks';
import styles from './Column/index.module.scss';

export interface ICreateColumnFormProps {
  viewId: string;
  projectId: string;
  onFinish?: () => void;
  onCancel?: () => void;
}

interface ICreateColumnFormData {
  title: string;
  project: { link: string };
  itemOrder: string[];
}

function CreateColumnForm(props: ICreateColumnFormProps) {
  const { projectId, viewId, onCancel, onFinish } = props;
  const f = useFormatMessage();
  const [form] = Form.useForm<ICreateColumnFormData>();
  const initialFormValues = useMemo<ICreateColumnFormData>(
    () => ({
      project: { link: projectId },
      title: '',
      itemOrder: [],
    }),
    [projectId]
  );
  const [addProjectColumn, { loading }] = useCreateProjectColumnMutation();

  const handleSubmit = async () => {
    const fields = form.getFieldsValue();
    const title = fields.title.trim();
    if (!viewId || !title) {
      return;
    }
    const input = {
      fields,
      viewId,
    };
    await addProjectColumn({ variables: { input } });
    form.resetFields();
    if (onFinish) {
      onFinish();
    }
  };

  useEffect(() => {
    form.setFieldsValue({ project: { link: projectId } });
  }, [form, projectId]);

  return (
    <Form
      name="CreateProjectColumnForm"
      form={form}
      className={styles.form}
      initialValues={initialFormValues}>
      <Form.Item hidden name={['project', 'link']}>
        <input />
      </Form.Item>
      <Form.List name={'itemOrder'}>{() => <></>}</Form.List>
      <Form.Item name="title">
        <Input
          autoFocus
          className="middle-input-without-affix"
          placeholder={f('inputColumnTitle')}
        />
      </Form.Item>
      <div className={styles.actions}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}>
          {f('addColumn')}
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

export default memo(CreateColumnForm);

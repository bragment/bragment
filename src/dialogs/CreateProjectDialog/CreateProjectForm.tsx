import {
  AlignLeftOutlined,
  FormOutlined,
  GlobalOutlined,
  LockOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import classNames from 'classnames';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormatMessage } from '../../components/hooks';
import {
  EProjectVisibility,
  IProjectBackground,
} from '../../libs/client/types';
import { useCreateProjectMutation } from '../../libs/react-query';
import BackgroundPopover from './BackgroundPopover';
import styles from './index.module.scss';

interface ICreateProjectFormData {
  workspace: string;
  title: string;
  description: string;
  visibility: EProjectVisibility;
  background: IProjectBackground;
}

interface ICreateProjectFormProps {
  defaultWorkspaceId?: string;
  onFinish?: () => void;
}

function CreateProjectForm(props: ICreateProjectFormProps) {
  const { defaultWorkspaceId, onFinish } = props;
  const f = useFormatMessage();
  const [bgPopoverVisible, setBgPopoverVisible] = useState(false);
  const [form] = Form.useForm<ICreateProjectFormData>();
  const initialFormValues = useMemo<ICreateProjectFormData>(
    () => ({
      workspace: defaultWorkspaceId || '',
      title: '',
      description: '',
      visibility: EProjectVisibility.Private,
      background: {
        image: '',
        color: '',
      },
    }),
    [defaultWorkspaceId]
  );
  const mutation = useCreateProjectMutation();

  const handleBgPopoverVisibleChange = useCallback((visible: boolean) => {
    setBgPopoverVisible(visible);
  }, []);
  const handleBgChange = useCallback(
    (background: IProjectBackground) => form.setFieldsValue({ background }),
    [form]
  );

  const handleSubmit = async () => {
    const fields = await form.validateFields();
    await mutation.mutateAsync(fields);
    form.resetFields();
    if (onFinish) {
      onFinish();
    }
  };

  useEffect(() => {
    form.setFieldsValue({ workspace: defaultWorkspaceId });
  }, [defaultWorkspaceId, form]);

  return (
    <Form
      name="CreateProjectForm"
      form={form}
      initialValues={initialFormValues}>
      <Form.Item hidden name="workspace">
        <input />
      </Form.Item>
      <Form.Item hidden name={['background', 'image']}>
        <input />
      </Form.Item>
      <Form.Item hidden name={['background', 'color']}>
        <input />
      </Form.Item>
      <Form.Item
        required
        name="title"
        rules={[{ required: true, message: f('requiredProjectTitle') }]}>
        <Input
          autoComplete="off"
          autoFocus
          bordered={false}
          className={classNames(
            styles.fieldInput,
            styles.titleField,
            bgPopoverVisible && styles.withBgPopover,
            'middle-input-with-prefix-and-suffix'
          )}
          prefix={<FormOutlined />}
          suffix={
            <BackgroundPopover
              onChange={handleBgChange}
              onVisibleChange={handleBgPopoverVisibleChange}>
              <PictureOutlined />
            </BackgroundPopover>
          }
          placeholder={f('projectTitle')}
          size="middle"
        />
      </Form.Item>
      <Form.Item name="description">
        <Input
          autoComplete="off"
          bordered={false}
          className={classNames(
            styles.fieldInput,
            'middle-input-with-prefix-and-suffix'
          )}
          prefix={<AlignLeftOutlined />}
          placeholder={f('projectDescription')}
          size="middle"
        />
      </Form.Item>
      <Form.Item name="visibility">
        <Select
          bordered={false}
          className={styles.fieldSelect}
          dropdownClassName={styles.fieldDropdown}>
          <Select.Option value={EProjectVisibility.Private}>
            <LockOutlined />
            {f('private')}
          </Select.Option>
          <Select.Option value={EProjectVisibility.Public}>
            <GlobalOutlined />
            {f('public')}
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item className={styles.formActions}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={mutation.isLoading}
          size="middle">
          {f('createProject')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(CreateProjectForm);

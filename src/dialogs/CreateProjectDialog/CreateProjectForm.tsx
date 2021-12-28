import {
  AlignLeftOutlined,
  FormOutlined,
  GlobalOutlined,
  LockOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import classNames from 'classnames';
import { memo, useCallback, useMemo, useState } from 'react';
import { useFormatMessage } from '../../components/hooks';
import {
  IProjectFragmentDoc,
  ProjectVisibility,
  useCreateProjectMutation,
} from '../../graphql';
import BackgroundPopover, { IBackground } from './BackgroundPopover';
import styles from './index.module.scss';

interface ICreateProjectFormData {
  title: string;
  description: string;
  visibility: ProjectVisibility;
  image: string;
  color: string;
}

interface ICreateProjectFormProps {
  onFinish?: () => void;
}

function CreateProjectForm(props: ICreateProjectFormProps) {
  const { onFinish } = props;
  const f = useFormatMessage();
  const [bgPopoverVisible, setBgPopoverVisible] = useState(false);
  const [form] = Form.useForm<ICreateProjectFormData>();
  const initialFormValues = useMemo<ICreateProjectFormData>(
    () => ({
      title: '',
      description: '',
      visibility: ProjectVisibility.Private,
      image: '',
      color: '',
    }),
    []
  );
  const handleBgPopoverVisibleChange = useCallback((visible: boolean) => {
    setBgPopoverVisible(visible);
  }, []);
  const handleBgChange = useCallback(
    (bg: IBackground) =>
      form.setFieldsValue({ image: bg.image || '', color: bg.color || '' }),
    [form]
  );
  const [addProject, { loading }] = useCreateProjectMutation({
    update(cache, response) {
      const a = response.data?.createProject;
      if (a) {
        cache.modify({
          fields: {
            projects(existingProjects) {
              const newProjectRef = cache.writeFragment({
                data: a.project,
                fragment: IProjectFragmentDoc,
              });
              return {
                ...existingProjects,
                edges: [
                  { node: newProjectRef, __typename: 'ProjectEdge' },
                  ...existingProjects.edges,
                ],
              };
            },
          },
        });
      }
    },
  });
  const handleSubmit = async () => {
    const fields = form.getFieldsValue();
    const input = {
      fields,
    };
    await addProject({ variables: { input } });
    form.resetFields();
    if (onFinish) {
      onFinish();
    }
  };

  return (
    <Form form={form} initialValues={initialFormValues}>
      <Form.Item hidden name="image">
        <input />
      </Form.Item>
      <Form.Item hidden name="color">
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
          <Select.Option value={ProjectVisibility.Private}>
            <LockOutlined />
            {f('private')}
          </Select.Option>
          <Select.Option value={ProjectVisibility.Public}>
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
          loading={loading}
          size="middle">
          {f('createProject')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(CreateProjectForm);

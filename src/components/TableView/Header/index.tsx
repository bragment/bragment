import classNames from 'classnames';
import { memo } from 'react';
import { HiHashtag, HiPlus } from 'react-icons/hi';
import {
  IProject,
  IProjectDataField,
  IProjectDataView,
} from '../../../libs/client/types';
import CreateDataFieldButton from '../../CreateDataFieldButton';
import { useFormatMessage } from '../../hooks';
import Item from './Item';
import styles from '../index.module.scss';

interface IHeaderProps {
  projectId: string;
  modelId: string;
  view: IProjectDataView;
  fields: IProjectDataField[];
  mainField?: IProjectDataField;
  onCreateDateFieldFinish: (project: IProject) => void;
}

function Header(props: IHeaderProps) {
  const f = useFormatMessage();
  const {
    projectId,
    modelId,
    view,
    fields,
    mainField,
    onCreateDateFieldFinish,
  } = props;
  const visibleFields = fields.filter(
    (field) =>
      !view.hiddenFields.includes(field._id) && field._id !== mainField?._id
  );

  return (
    <div
      className={classNames(
        'bg-base-200 border-base-300 text-base-content',
        'w-fit min-w-full sticky top-0 border-t border-b flex items-center z-10',
        styles.header
      )}>
      <div
        className={classNames(
          'bg-base-200 border-base-300',
          'sticky left-0 flex items-center justify-center',
          mainField && 'border-r',
          styles.scrollableLeft
        )}>
        <div
          className={classNames(
            'w-16 h-full flex items-center justify-center'
          )}>
          <HiHashtag className="text-lg" />
        </div>
        {mainField && (
          <div
            className={classNames(
              'border-base-300',
              'h-full border-l flex justify-center'
            )}>
            <Item field={mainField} main />
          </div>
        )}
      </div>
      <div className={classNames('w-fit flex', styles.fieldList)}>
        {visibleFields.map((field, i) => (
          <Item
            key={field._id}
            field={field}
            borderedRight={i < visibleFields.length - 1}
          />
        ))}
        {!mainField && (
          <div
            className={classNames(
              'border-base-300',
              'flex-auto border-l flex items-center justify-center',
              'text-base-content-opacity'
            )}>
            {f('project.noFields')}
          </div>
        )}
      </div>
      <div
        className={classNames(
          'bg-base-200 border-base-300',
          'w-16 sticky right-0 border-l flex items-center justify-center',
          styles.scrollableRight
        )}>
        <CreateDataFieldButton
          projectId={projectId}
          modelId={modelId}
          existingFields={fields}
          onFinish={onCreateDateFieldFinish}>
          <HiPlus className="text-lg" />
        </CreateDataFieldButton>
      </div>
    </div>
  );
}
export default memo(Header);

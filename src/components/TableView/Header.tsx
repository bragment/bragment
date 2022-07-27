import classNames from 'classnames';
import { memo } from 'react';
import { HiHashtag, HiPlus } from 'react-icons/hi';
import {
  IProject,
  IProjectDataField,
  IProjectDataView,
} from '../../libs/client/types';
import CreateDataFieldButton from '../CreateDataFieldButton';
import { dataFieldTypeRecord } from '../DataFieldTypeSelect/config';
import { useFormatMessage } from '../hooks';
import styles from './index.module.scss';

interface IHeaderProps {
  projectId: string;
  modelId: string;
  view: IProjectDataView;
  fields: IProjectDataField[];
  onCreateDateFieldFinish: (project: IProject) => void;
}

function Header(props: IHeaderProps) {
  const f = useFormatMessage();
  const { projectId, modelId, view, fields, onCreateDateFieldFinish } = props;
  const visibleFields = fields.filter(
    (field) => !view.hiddenFields.includes(field._id)
  );

  return (
    <div
      className={classNames(
        'bg-base-200 text-base-content border-base-300',
        'w-fit min-w-full sticky top-0 flex items-center border-t border-b',
        styles.header
      )}>
      <div className="w-14 sticky left-0 pr-0 bg-base-200 flex justify-end">
        <div className="w-11 flex items-center justify-center">
          <HiHashtag className="text-lg" />
        </div>
      </div>
      <div className="w-3 sticky left-14 pointer-events-none from-base-200 bg-gradient-to-r to-transparent" />
      <div className={classNames('w-fit flex', styles.fieldList)}>
        {visibleFields.length ? (
          visibleFields.map((el, i) => {
            const Icon = dataFieldTypeRecord[el.type]?.Icon;
            return (
              <div
                key={el._id}
                className={classNames(
                  'border-base-300',
                  'flex items-center border-r',
                  i === 0 && 'border-l',
                  styles.item
                )}>
                {Icon && <Icon className="mr-2 text-lg opacity-70" />}
                {el.title}
              </div>
            );
          })
        ) : (
          <div className="flex-auto flex items-center justify-center opacity-50">
            {f('project.noFields')}
          </div>
        )}
      </div>
      <div className="w-3 sticky right-14 pointer-events-none from-base-200 bg-gradient-to-l to-transparent" />
      <div className="w-14 sticky right-0 pl-0 bg-base-200 z-30 flex items-center">
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

import classNames from 'classnames';
import { memo } from 'react';
import { useFormatMessage } from '../hooks';
import CreateDataFieldForm, {
  ICreateDataFieldFormProps,
} from './CreateDataFieldForm';

function Dropdown(props: ICreateDataFieldFormProps) {
  const f = useFormatMessage();
  return (
    <ul
      tabIndex={0}
      className={classNames(
        'dropdown-content menu border-base-300 bg-base-100 rounded-box',
        'w-80 mt-2 p-6 pb-16 border shadow'
      )}>
      <div>
        <h3 className={classNames('text-base-content', 'text-lg font-bold')}>
          {f('project.addField')}
        </h3>
        <CreateDataFieldForm {...props} />
      </div>
    </ul>
  );
}

export default memo(Dropdown);

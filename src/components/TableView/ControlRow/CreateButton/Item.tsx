import classNames from 'classnames';
import { memo } from 'react';
import { IProjectDataForm } from '../../../../libs/client/types';

interface IItemProps {
  form: IProjectDataForm;
  onClick: (form: IProjectDataForm) => void;
}

function Item(props: IItemProps) {
  const { form, onClick } = props;
  const handleClick = () => {
    onClick(form);
  };
  return (
    <li
      className={classNames('bg-base-100', 'rounded-lg')}
      onClick={handleClick}>
      <div
        className={classNames(
          'cursor-pointer hover:bg-base-content/10',
          'h-12 rounded-lg pl-4 pr-2 py-2 flex items-center text-base-content'
        )}>
        <div className="flex-auto mr-2">{form.title}</div>
      </div>
    </li>
  );
}

export default memo(Item);

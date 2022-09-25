import classNames from 'classnames';
import { memo } from 'react';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { IProjectDataForm } from '../../../../libs/client/types';
import { useFormatMessage } from '../../../hooks';

interface IItemProps {
  form: IProjectDataForm;
  onClick: (form: IProjectDataForm) => void;
  onEdit: (form: IProjectDataForm) => void;
  onDelete: (form: IProjectDataForm) => void;
}

function Item(props: IItemProps) {
  const { form, onClick, onEdit, onDelete } = props;
  const f = useFormatMessage();

  const handleClick = () => {
    onClick(form);
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit(form);
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(form);
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
        <button
          aria-label={f('common.edit')}
          className={classNames('btn btn-sm btn-ghost', 'px-2 text-lg')}
          onClick={handleEdit}>
          <HiPencilAlt />
        </button>
        <button
          aria-label={f('common.delete')}
          className={classNames(
            'btn btn-sm btn-ghost text-error',
            'px-2 text-lg'
          )}
          onClick={handleDelete}>
          <HiTrash />
        </button>
      </div>
    </li>
  );
}

export default memo(Item);

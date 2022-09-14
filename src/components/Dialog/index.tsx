import classNames from 'classnames';
import { memo } from 'react';
import { HiOutlineX } from 'react-icons/hi';

interface IDialogProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  visible: boolean;
  onClose: () => void;
}

function Dialog(props: IDialogProps) {
  const { id, children, className, visible, onClose } = props;

  return (
    <div className={classNames(!visible && 'content-visibility-hidden')}>
      <input
        id={id}
        type="checkbox"
        className="modal-toggle"
        checked={visible}
        readOnly
      />
      <div className={'modal'}>
        <div className={classNames('modal-box', 'relative', className)}>
          <button
            className={classNames(
              'btn btn-sm btn-circle',
              'absolute right-4 top-4 z-10'
            )}
            onClick={onClose}>
            <HiOutlineX className="text-lg" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default memo(Dialog);

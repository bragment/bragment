import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
} from 'react-icons/hi';
import { useDialogStore } from '../../components/hooks';
import { EToastType } from '../../stores/types';

function GlobalToast() {
  const { toastList } = useDialogStore();

  const getToastIconByType = useCallback((type: EToastType) => {
    switch (type) {
      case EToastType.Error:
        return <HiOutlineXCircle />;
      case EToastType.Success:
        return <HiOutlineCheckCircle />;
      case EToastType.Warning:
        return <HiOutlineExclamationCircle />;
      default:
        return <HiOutlineInformationCircle className="text-info" />;
    }
  }, []);

  const getToastClassName = useCallback((type: EToastType) => {
    switch (type) {
      case EToastType.Error:
        return 'alert-error';
      case EToastType.Success:
        return 'alert-success';
      case EToastType.Warning:
        return 'alert-warning';
      default:
        return 'border border-base-300';
    }
  }, []);

  return (
    <div className="toast toast-top toast-center items-center">
      {toastList.map(({ content, key, type }) => (
        <div
          className={classNames(
            'alert shadow-lg',
            'w-auto',
            getToastClassName(type)
          )}
          key={key}>
          <div>
            <span className="text-2xl">{getToastIconByType(type)}</span>
            <span>{content}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default observer(GlobalToast);

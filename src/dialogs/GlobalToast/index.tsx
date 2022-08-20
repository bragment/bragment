import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
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

  const toastIconRecord = useMemo(
    () => ({
      [EToastType.Error]: <HiOutlineXCircle />,
      [EToastType.Info]: <HiOutlineInformationCircle className="text-info" />,
      [EToastType.Success]: <HiOutlineCheckCircle />,
      [EToastType.Warning]: <HiOutlineExclamationCircle />,
    }),
    []
  );

  const toastClassNameRecord = useMemo(
    () => ({
      [EToastType.Error]: 'alert-error',
      [EToastType.Info]: 'border border-base-300',
      [EToastType.Success]: 'alert-success',
      [EToastType.Warning]: 'alert-warning',
    }),
    []
  );

  return (
    <div className={classNames('toast toast-top toast-center', 'z-50')}>
      {toastList.map(({ content, key, type }) => (
        <div
          className={classNames(
            'alert shadow-lg',
            'w-auto',
            toastClassNameRecord[type]
          )}
          key={key}>
          <div>
            <div className="text-2xl">{toastIconRecord[type]}</div>
            <div className="max-w-xs whitespace-pre">{content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default observer(GlobalToast);

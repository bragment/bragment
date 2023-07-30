import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInformationCircle,
} from 'react-icons/hi2';
import { useDialogStore } from '../../components/hooks';
import { EToastType } from '../../stores/types';

function GlobalToast() {
  const { toastList } = useDialogStore();

  const toastIconRecord = useMemo(
    () => ({
      [EToastType.Error]: HiExclamationCircle,
      [EToastType.Info]: HiInformationCircle,
      [EToastType.Success]: HiCheckCircle,
      [EToastType.Warning]: HiExclamationTriangle,
    }),
    []
  );

  const toastClassNameRecord = useMemo(
    () => ({
      [EToastType.Error]: 'alert-error',
      [EToastType.Info]: '[&>svg]:text-info',
      [EToastType.Success]: 'alert-success',
      [EToastType.Warning]: 'alert-warning',
    }),
    []
  );

  return (
    <div className={clsx('toast toast-top toast-center', 'z-50')}>
      {toastList.map(({ content, key, type }) => {
        const Icon = toastIconRecord[type];
        return (
          <div
            className={clsx(
              'alert shadow-lg',
              'w-fit mx-auto',
              toastClassNameRecord[type]
            )}
            key={key}>
            <Icon className="h-6 w-6" />
            <span>{content}</span>
          </div>
        );
      })}
    </div>
  );
}

export default observer(GlobalToast);

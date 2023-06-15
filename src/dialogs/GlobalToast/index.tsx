import clsx from 'clsx';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  XCircleIcon,
} from 'lucide-react';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { useDialogStore } from '../../components/hooks';
import { EToastType } from '../../stores/types';

function GlobalToast() {
  const { toastList } = useDialogStore();

  const toastIconRecord = useMemo(
    () => ({
      [EToastType.Error]: XCircleIcon,
      [EToastType.Info]: InfoIcon,
      [EToastType.Success]: CheckCircle2Icon,
      [EToastType.Warning]: AlertCircleIcon,
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
            <Icon className="text-2xl" />
            <span>{content}</span>
          </div>
        );
      })}
    </div>
  );
}

export default observer(GlobalToast);

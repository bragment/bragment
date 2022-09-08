import classNames from 'classnames';
import { memo } from 'react';
import styles from './index.module.scss';

interface IAnimateSpinProps {
  className?: string;
  bgColorClassName?: string;
}

function AnimateSpin(props: IAnimateSpinProps) {
  const { className, bgColorClassName } = props;
  return (
    <div className={classNames(styles.wrapper, className, bgColorClassName)}>
      <div
        className={classNames(
          'absolute top-0 bottom-0 -left-3 w-3 h-auto bg-gradient-to-l to-transparent',
          bgColorClassName?.replace('bg-', 'from-')
        )}
      />
    </div>
  );
}
export default memo(AnimateSpin);

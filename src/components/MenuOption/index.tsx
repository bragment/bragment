import classNames from 'classnames';
import { memo, ReactElement } from 'react';
import styles from './index.module.scss';

interface IMenuOptionProps {
  title: string;
  active?: boolean;
  prefix?: ReactElement;
  suffix?: ReactElement;
  className?: string;
  onClick?: () => void;
}

function MenuOption(props: IMenuOptionProps) {
  const { active, prefix, suffix, title, className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(
        styles.wrapper,
        active && styles.active,
        className
      )}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      <div className={styles.title}>{title}</div>
      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </div>
  );
}

export default memo(MenuOption);

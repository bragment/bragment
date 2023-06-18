import classNames from 'classnames';
import { memo } from 'react';

interface IPrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fromColor?: string;
  toColor?: string;
}

function PrimaryButton(props: IPrimaryButtonProps) {
  const {
    children,
    className,
    loading,
    fromColor = 'from-cyan-500',
    toColor = 'to-blue-500',
    ...otherProps
  } = props;
  return (
    <button
      className={classNames(
        'btn btn-primary',
        'border-0 focus:border',
        'bg-gradient-to-r hover:bg-gradient-to-bl',
        loading && 'pointer-events-none',
        fromColor,
        toColor,
        className
      )}
      {...otherProps}>
      {loading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}

export default memo(PrimaryButton);

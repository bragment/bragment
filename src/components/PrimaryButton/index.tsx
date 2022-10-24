import classNames from 'classnames';
import { memo } from 'react';

interface IPrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fromColor?: string;
  toColor?: string;
}

function PrimaryButton(props: IPrimaryButtonProps) {
  const {
    children,
    className,
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
        fromColor,
        toColor,
        className
      )}
      {...otherProps}>
      {children}
    </button>
  );
}

export default memo(PrimaryButton);

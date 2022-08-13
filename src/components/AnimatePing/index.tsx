import classNames from 'classnames';
import { memo } from 'react';

export interface IAnimatePingProps {
  children: React.ReactNode;
  ping?: boolean;
}

function AnimatePing(props: IAnimatePingProps) {
  const { children, ping } = props;

  return (
    <span className="relative inline-flex">
      {children}
      {ping && (
        <span
          className={classNames(
            'flex absolute h-3 w-3 top-0 right-0 -mt-[0.125rem] -mr-[0.125rem] pointer-events-none'
          )}>
          <span
            className={classNames(
              'bg-secondary-focus',
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
            )}
          />
          <span
            className={classNames(
              'bg-secondary',
              'relative inline-flex rounded-full h-3 w-3'
            )}
          />
        </span>
      )}
    </span>
  );
}

export default memo(AnimatePing);

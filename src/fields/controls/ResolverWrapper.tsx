import { memo } from 'react';

interface IResolverWrapperProps {
  children: JSX.Element;
}

function ResolverWrapper(props: IResolverWrapperProps) {
  const { children } = props;
  return <>{children}</>;
}

export default memo(ResolverWrapper);

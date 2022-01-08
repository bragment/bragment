import { memo } from 'react';
import { Routes, RoutesProps, useLocation } from 'react-router-dom';
import { a, useTransition } from 'react-spring';
import styles from './index.module.scss';

function AnimatedRoutes(props: RoutesProps) {
  const location = useLocation();
  const transitions = useTransition(location, {
    config: { duration: 210 },
    key: location.pathname,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return transitions((style, item) => (
    <a.div className={styles.animatedRoutes} style={{ ...style }}>
      <Routes {...props} location={item} />
    </a.div>
  ));
}

export default memo(AnimatedRoutes);

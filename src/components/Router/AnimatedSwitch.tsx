import { memo } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { a, config, Transition } from 'react-spring';
import styles from './index.module.scss';

interface IAnimatedSwitchProps {
  children?: React.ReactNode | undefined;
}

function AnimatedSwitch(props: IAnimatedSwitchProps) {
  const { children } = props;
  const location = useLocation();

  return (
    <Transition
      items={location}
      config={{ ...config.gentle, duration: 200 }}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}>
      {(style, item) => (
        <a.div className={styles.animatedSwitchContainer} style={style}>
          <Switch location={item}>{children}</Switch>
        </a.div>
      )}
    </Transition>
  );
}

export default memo(AnimatedSwitch);

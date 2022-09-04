import classNames from 'classnames';
import { memo } from 'react';
import ScrollContainer from '../../components/ScrollContainer';
import Content from './Content';

function HomePage() {
  return (
    <div className={classNames('bg-base-100', 'w-full h-full')}>
      <ScrollContainer autoHide>
        <div className="max-w-screen-lg mx-auto">
          <Content />
        </div>
        <div className="from-base-100 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
      </ScrollContainer>
    </div>
  );
}

export default memo(HomePage);

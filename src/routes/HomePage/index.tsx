import classNames from 'classnames';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import Content from './Content';

function HomePage() {
  return (
    <div className={classNames('bg-base-100', 'w-full h-full')}>
      <Scrollbars autoHide>
        <div className="max-w-screen-lg mx-auto">
          <Content />
        </div>
        <div className="from-base-100 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
      </Scrollbars>
    </div>
  );
}

export default memo(HomePage);

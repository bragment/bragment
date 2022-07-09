import { memo } from 'react';

function HomePage() {
  return (
    <div className={'page'}>
      <div className={'container'}>home page</div>
    </div>
  );
}

export default memo(HomePage);

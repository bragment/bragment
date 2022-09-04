import classNames from 'classnames';
import { memo } from 'react';
import image from '../../assets/under-construction.svg';
import { useFormatMessage } from '../../components/hooks';
import ScrollContainer from '../../components/ScrollContainer';

function SettingPage() {
  const f = useFormatMessage();
  return (
    <div className={classNames('bg-base-200', 'w-full h-full')}>
      <ScrollContainer autoHide>
        <div
          className={classNames('text-base-content', 'max-w-lg my-20 mx-auto')}>
          <div
            className="h-80 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
          <h1 className="text-3xl font-blob text-center mt-10">
            {f('common.underConstruction')}
          </h1>
        </div>
      </ScrollContainer>
    </div>
  );
}

export default memo(SettingPage);

import classNames from 'classnames';
import { memo } from 'react';
import image from '../../assets/under-construction.svg';
import { useFormatMessage } from '../../components/hooks';

function UnderConstructionPage() {
  const f = useFormatMessage();
  return (
    <div className="w-full">
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
    </div>
  );
}

export default memo(UnderConstructionPage);

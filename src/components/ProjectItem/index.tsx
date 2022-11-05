import classNames from 'classnames';
import { memo, useState } from 'react';
import { IProject } from '../../libs/client/types';
import { getSmallImageUrl } from '../../libs/unsplash';

export interface IProjectItemProps {
  project: IProject;
}

function ProjectItem(props: IProjectItemProps) {
  const { project } = props;
  const { title, background: { image, color } = {} } = project;
  const [imageVisible, setImageVisible] = useState(!!image);

  const handleImageError = () => {
    setImageVisible(false);
  };

  return (
    <div
      className={classNames(
        'rounded-box overflow-hidden',
        'transition-all duration-500 ease-in-out',
        'hover:z-30 hover:shadow-xl hover:-translate-y-0.5'
      )}>
      <div
        className={classNames(
          'card image-full bg-base-100',
          'group clickable',
          'w-full h-[7rem] z-10',
          'rounded-box overflow-hidden shadow-xl before:!rounded-none'
        )}>
        <figure style={{ backgroundColor: !imageVisible ? color : undefined }}>
          {imageVisible && (
            <img
              className={classNames(
                'h-full w-full absolute object-center',
                'group-[&.card:hover]:scale-110',
                'transition-transform duration-500 ease-in-out'
              )}
              src={image ? getSmallImageUrl(image) : undefined}
              alt=""
              loading="eager"
              decoding="auto"
              onError={handleImageError}
            />
          )}
        </figure>
        <div className={classNames('card-body', 'h-full p-4')}>
          <h2
            className={classNames(
              'card-title',
              'capitalize text-3xl mr-auto',
              'underline decoration-4 decoration-transparent',
              'bg-[length:100%_0%] bg-[position:0_88%] group-[&.card:hover]:decoration-purple-500 hover:bg-[length:100%_100%] hover:text-white',
              'bg-gradient-to-r from-violet-500  to-rose-500 bg-no-repeat',
              'transition-all ease-in-out duration-300'
            )}>
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectItem);

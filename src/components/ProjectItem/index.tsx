import classNames from 'classnames';
import { memo } from 'react';
import { IProject } from '../../libs/client/types';
import { getSmallImageUrl } from '../../libs/unsplash';
import ProgressiveBackground from '../ProgressiveBackground';
import styles from './index.module.scss';

export interface IProjectItemProps {
  project: IProject;
}

function ProjectItem(props: IProjectItemProps) {
  const { project } = props;
  const { title, background: { image, color } = {} } = project;

  return (
    <div
      className={classNames(
        'card bg-base-100',
        'w-full h-[7rem] cursor-pointer hover:shadow-xl image-full',
        'clickable',
        styles.card
      )}>
      <figure>
        <ProgressiveBackground
          color={color}
          image={image ? getSmallImageUrl(image) : undefined}
        />
      </figure>
      <div className={classNames('card-body', 'h-full p-4')}>
        <h2 className={classNames('card-title', 'capitalize')}>{title}</h2>
      </div>
    </div>
  );
}

export default memo(ProjectItem);

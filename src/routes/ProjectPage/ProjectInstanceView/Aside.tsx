import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../components/hooks';
import { IProject } from '../../../libs/client/types';
import { useProjectQuery } from '../../../libs/react-query';
import { getSmallImageUrl } from '../../../libs/unsplash';
import DataModelCollapse from '../DataModelCollapse';

function Aside() {
  const { projectId = '', modelId = '' } = useParams();
  const { me } = useUserStore();
  const { data: project } = useProjectQuery(projectId, !!me);
  const { title, background: { image, color } = {} } = (project ||
    {}) as IProject;
  const [imageVisible, setImageVisible] = useState(!!image);
  const handleImageError = () => {
    setImageVisible(false);
  };

  const models = useMemo(() => {
    return project?.models.slice(0).reverse() || [];
  }, [project]);

  return (
    <aside className={classNames('bg-base-200 text-base-content', 'w-80')}>
      <header className="p-3">
        <div className="rounded-box overflow-hidden">
          <div
            className={classNames(
              'card image-full bg-base-100',
              'w-full h-auto',
              'z-10 rounded-box before:!rounded-none'
            )}>
            <figure
              style={{ backgroundColor: !imageVisible ? color : undefined }}>
              {imageVisible && (
                <img
                  className={classNames('h-full w-full absolute object-center')}
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
                  'capitalize text-3xl mr-auto'
                )}>
                {title}
              </h2>
            </div>
          </div>
        </div>
      </header>
      <main className="py-4 px-5">
        <DataModelCollapse
          projectId={projectId}
          selectedModelId={modelId}
          models={models}
        />
      </main>
    </aside>
  );
}

export default observer(Aside);

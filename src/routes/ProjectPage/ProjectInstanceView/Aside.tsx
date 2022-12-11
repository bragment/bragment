import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useMemo, useRef, useState } from 'react';
import { HiPlus } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../../components/hooks';
import ScrollContainer from '../../../components/ScrollContainer';
import { IProject, IProjectDataView } from '../../../libs/client/types';
import { useProjectQuery } from '../../../libs/react-query';
import { getSmallImageUrl } from '../../../libs/unsplash';
import DataModelCollapse from '../DataModelCollapse';

function Aside() {
  const { projectId = '' } = useParams();
  const mainRef = useRef<HTMLElement>(null);
  const f = useFormatMessage();
  const { me } = useUserStore();
  const { setCreateDataModelDialogVisible } = useDialogStore();
  const { data: project } = useProjectQuery(projectId, !!me);
  const title = project?.title;
  const { image, color } =
    project?.background || ({} as IProject['background']);
  const [imageVisible, setImageVisible] = useState(!!image);
  const handleImageError = () => {
    setImageVisible(false);
  };
  const showCreateDataModelDialog = () => setCreateDataModelDialogVisible(true);

  const models = useMemo(() => {
    return project?.models || [];
  }, [project?.models]);

  const views = useMemo(() => {
    return project?.views || [];
  }, [project?.views]);

  const modelViewRecord = useMemo(() => {
    return views.reduce<Record<string, IProjectDataView[]>>((prev, view) => {
      const id = view.model;
      if (!prev[id]) {
        prev[id] = [];
      }
      prev[id].push(view);
      return prev;
    }, {});
  }, [views]);

  return (
    <aside className={classNames('bg-base-200', 'w-80')}>
      <ScrollContainer className="[&.top-scrollable_header]:shadow-sm" autoHide>
        <header
          className={classNames(
            'bg-base-200 bg-opacity-70 backdrop-blur',
            'sticky top-0 z-10',
            'h-36 p-3',
            'transition-all duration-100'
          )}>
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
                    className={classNames(
                      'h-full w-full absolute object-center'
                    )}
                    src={image ? getSmallImageUrl(image) : undefined}
                    alt=""
                    loading="eager"
                    decoding="auto"
                    onError={handleImageError}
                  />
                )}
              </figure>
              <div className={classNames('card-body', 'h-full p-5')}>
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
          <div
            className={classNames(
              'text-base-content/70',
              'w-full h-12 px-4',
              'absolute left-0 bottom-0',
              'flex items-center'
            )}>
            <div className="flex-auto text-sm font-semibold pl-2">
              {f('project.model')}
            </div>
            <div className="flex-none">
              <button
                className="btn btn-ghost btn-square btn-sm text-lg"
                onClick={showCreateDataModelDialog}>
                <HiPlus />
              </button>
            </div>
          </div>
        </header>
        <main ref={mainRef} className="px-5">
          {models.map((model) => (
            <DataModelCollapse
              key={model._id}
              projectId={projectId}
              model={model}
              views={modelViewRecord[model._id]}
            />
          ))}
        </main>
        <footer
          className={classNames(
            'sticky bottom-0',
            'w-full h-20',
            'bg-gradient-to-t from-base-200 to-transparent'
          )}
        />
      </ScrollContainer>
    </aside>
  );
}

export default observer(Aside);

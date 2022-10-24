import classNames from 'classnames';
import { memo } from 'react';
import image from '../../assets/error-occurred.svg';
import { useFormatMessage } from '../../components/hooks';
import ScrollContainer from '../../components/ScrollContainer';

interface IErrorPageProps {
  error: Error;
  eventId: string | null;
  componentStack: string | null;
  resetError: () => void;
}

function ErrorPage(props: IErrorPageProps) {
  const { error, eventId, componentStack, resetError } = props;
  console.error(error);
  console.info(eventId);
  console.info(componentStack);

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
          <h1 className="text-3xl font-blob text-center my-10">
            {f('common.errorOccurred')}
          </h1>
          <div className="text-center">
            <button
              className="btn btn-warning btn-block max-w-xs"
              onClick={resetError}>
              {f('common.clickAndRetry')}
            </button>
          </div>
        </div>
      </ScrollContainer>
    </div>
  );
}

export default memo(ErrorPage);

import classNames from 'classnames';
import { CSSProperties, memo } from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';

export interface IProgressiveBackgroundProps {
  className?: string;
  placeholder?: string;
  image?: string;
  color?: string;
}

function ProgressiveBackground(props: IProgressiveBackgroundProps) {
  const { className, color, image, placeholder } = props;

  if (image && placeholder) {
    return (
      <ProgressiveImage src={image} placeholder={placeholder}>
        {(src: string, loading?: boolean) => {
          const style: CSSProperties = {
            backgroundColor: color,
            backgroundImage: `url(${src})`,
          };
          if (loading) {
            style.filter = 'blur(5px)';
            style.transform = 'scale(1.1, 1.1)';
          }
          return (
            <div
              className={classNames(
                'w-full h-full bg-center bg-cover bg-no-repeat transition-transform',
                className
              )}
              style={style}
            />
          );
        }}
      </ProgressiveImage>
    );
  }
  return (
    <div
      className={classNames(
        'w-full h-full bg-center bg-cover bg-no-repeat transition-transform',
        className
      )}
      style={{
        backgroundColor: color,
        backgroundImage: image ? `url(${image})` : undefined,
      }}
    />
  );
}

export default memo(ProgressiveBackground);

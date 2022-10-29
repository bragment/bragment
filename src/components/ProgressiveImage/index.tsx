import { Component, ReactElement } from 'react';
import ProgressiveImage, {
  ProgressiveImageProps,
  ProgressiveImageState,
} from 'react-progressive-graceful-image';

export class FixedReactProgressiveImage extends Component<
  ProgressiveImageProps & {
    children: (src: string, loading: boolean) => ReactElement;
  },
  ProgressiveImageState
> {}

export default ProgressiveImage as typeof FixedReactProgressiveImage;

import { IProjectItemFragment } from '../graphql';

export interface ICardSampleViewProps {
  data: IProjectItemFragment;
}

export interface ICardComponent {
  readonly type: string;
  readonly SampleView: React.ComponentType<ICardSampleViewProps>;
}

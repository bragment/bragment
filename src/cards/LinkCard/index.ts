import { ProjectItemType } from '../../graphql';
import { ICardComponent } from '../types';
import SampleView from './SampleView';

const LinkCard: ICardComponent = {
  type: ProjectItemType.Link,
  SampleView,
};

export default LinkCard;

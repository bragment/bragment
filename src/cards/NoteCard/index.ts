import { ProjectItemType } from '../../graphql';
import { ICardComponent } from '../types';
import SampleView from './SampleView';

const NoteCard: ICardComponent = {
  type: ProjectItemType.Note,
  SampleView,
};

export default NoteCard;

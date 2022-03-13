import LinkCard from './LinkCard';
import NoteCard from './NoteCard';
import { ICardComponent } from './types';

const cardMap = new Map<string, ICardComponent>();

export enum ECardComponentFilter {
  HAS_CREATE_FROM_ITEMS = 'HAS_CREATE_FROM_ITEMS',
  HAS_MESSAGES = 'HAS_MESSAGES',
}

export function getCardComponent(type: string) {
  return cardMap.get(type);
}

export function setCardComponent(type: string, component: ICardComponent) {
  return cardMap.set(type, component);
}

setCardComponent(LinkCard.type, LinkCard);
setCardComponent(NoteCard.type, NoteCard);

import { memo } from 'react';
import Card from './Card';

interface ICardListProps {
  cardIds: string[];
}

function CardList(props: ICardListProps) {
  const { cardIds } = props;

  return (
    <>
      {cardIds.map((objectId, index) => (
        <Card objectId={objectId} index={index} key={objectId} />
      ))}
    </>
  );
}

export default memo(CardList);

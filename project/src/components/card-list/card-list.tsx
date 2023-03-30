import Card from '../card/card';
import {Offer} from '../../types/offer';

type OfferProps = {
  offers: Offer[];
  onOfferHover?:(id: number) => void;
  onOfferLeave?:(id: null) => void;
  classList: string[];
}

function CardList({offers, onOfferHover, onOfferLeave ,classList}: OfferProps): JSX.Element {

  return (
    <div className={`${classList} places__list`}>
      {offers.map((offer) => (
        <Card offer={offer} key={offer.id} onOfferHover={onOfferHover} onOfferLeave={onOfferLeave}/>
      ))}
    </div>
  );
}

export default CardList;

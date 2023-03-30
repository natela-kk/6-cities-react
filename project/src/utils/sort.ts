import { Offer } from '../types/offer';
import {SORT_TYPE} from '../const';

export const getSortedOffers = (offers: Offer[], sort: string) => {
  switch(sort) {
    case(SORT_TYPE.priceAsc): {
      return offers.sort((prev, next) => prev.price - next.price);
    }
    case(SORT_TYPE.priceDes): {
      return offers.sort((prev, next) => next.price - prev.price);
    }
    case(SORT_TYPE.topRated): {
      return offers.sort((prev, next) => next.rating - prev.rating);
    }
    default: return offers;
  }
};

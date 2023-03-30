import {NameSpace} from '../../const';
import {Offer} from '../../types/offer';
import {State} from '../../types/state';

export const loadOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Offers].isDataLoaded;

export const loadProperty = (state: State): Offer | null => state[NameSpace.Offers].property;

export const loadNearby = (state: State): Offer[] => state[NameSpace.Offers].nearby;

export const loadFavorites = (state: State): Offer[] => state[NameSpace.Offers].favorites;

export const getLoadedFavoritesStatus = (state: State): boolean => state[NameSpace.Offers].isFavoritesLoaded;

import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { Offer } from '../../types/offer';

type InitialState = {
  offers: Offer[],
  isDataLoaded: boolean,
  property: Offer | null,
  nearby: Offer[],
  favorites: Offer[],
  isFavoritesLoaded: boolean,
}

const initialState: InitialState = {
  offers: [],
  isDataLoaded: false,
  property: null,
  nearby: [],
  favorites: [],
  isFavoritesLoaded: false,
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    loadOffersAction: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    markFavoriteAction: (state, action) => {
      const updatedOfferIndex = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (updatedOfferIndex !== -1) {
        state.offers[updatedOfferIndex] = action.payload;
      }

      if (state.property) {
        state.property = action.payload;
      }

      if (state.nearby.length !== 0) {
        const updatedNearbyIndex = state.nearby.findIndex((offer) => offer.id === action.payload.id);
        if (updatedNearbyIndex !== -1) {
          state.nearby[updatedNearbyIndex] = action.payload;
        }
      }
      if(state.isFavoritesLoaded) {
        state.property = null;
        const updatedNearbyIndex = state.favorites.findIndex((offer) => offer.id === action.payload.id);
        if (updatedNearbyIndex !== -1) {
          state.favorites[updatedNearbyIndex] = action.payload;
          state.favorites = state.favorites.filter((offer) => offer.isFavorite);
        }
      }
    },
    loadFavoritesAction: (state, action) => {
      state.favorites = action.payload;
      state.isFavoritesLoaded = true;
    },
    loadPropertyAction: (state, action) => {
      state.property = action.payload;
    },
    loadNearbyAction: (state, action) => {
      state.nearby = action.payload;
    },
  },
});

export const {loadOffersAction, markFavoriteAction, loadPropertyAction, loadNearbyAction, loadFavoritesAction} = offers.actions;

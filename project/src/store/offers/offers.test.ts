import { offers } from './offers';
import { loadOffersAction, markFavoriteAction, loadFavoritesAction, loadPropertyAction, loadNearbyAction } from './offers';

describe('Reducer: city', () => {
  it('Should change city', () => {
    const state = {
      offers: [],
      isDataLoaded: false,
      property: null,
      nearby: [],
      favorites: [],
      isFavoritesLoaded: false,
    };
    expect(offers.reducer(state, loadNearbyAction(state.nearby)))
      .toEqual({offers: [],
        isDataLoaded: false,
        property: null,
        nearby: state.nearby,
        favorites: [],
        isFavoritesLoaded: false,
      });
  });
});

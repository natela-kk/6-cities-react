import { city } from './city';
import { changeCityAction } from './city';
import { CITIES } from '../../const';

describe('Reducer: city', () => {
  it('Should change city', () => {
    const state = {city: CITIES[0]};
    expect(city.reducer(state, changeCityAction(city)))
      .toEqual({city});
  });
});

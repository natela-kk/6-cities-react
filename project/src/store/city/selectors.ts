import {NameSpace} from '../../const';
import { City } from '../../types/offer';
import {State} from '../../types/state';

export const getCity = (state: State): City => state[NameSpace.City].city;

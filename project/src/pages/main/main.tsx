import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';
import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer';
import { getCity } from '../../store/city/selectors';
import { loadOffers } from '../../store/offers/selectors';
import { getSortType } from '../../store/sort/selectors';
import EmptyList from '../../components/empty-list/empty-list';

function Main(): JSX.Element {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(loadOffers);
  const sortType = useAppSelector(getSortType);

  const filteredOffers = offers.filter((offer: Offer) => offer.city.name === city.name);

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs currentsCity={city.name}/>
        {filteredOffers.length === 0 ?
          <EmptyList currentsCity={city.name}/>:
          <Cities offers={filteredOffers} sortType={sortType} currentsCity={city}/>}

      </main>
    </div>);
}

export default Main;

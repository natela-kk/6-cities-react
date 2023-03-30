import Header from '../../components/header/header';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import { getLoadedFavoritesStatus, loadFavorites } from '../../store/offers/selectors';

function Favorites(): JSX.Element {
  const isFavoritesLoaded = useAppSelector(getLoadedFavoritesStatus);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(loadFavorites);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (!isFavoritesLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const favoriteCities = [...new Set(favorites.map((offer) => offer.city.name))];

  return(
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteCities.length === 0 ? <EmptyFavorites /> :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <ul className="favorites__list">
                {favoriteCities.map((city: string) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="/">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorites.map((offer) => (offer.city.name === city && (
                        <Card offer={offer} key={offer.id} isSmall />
                      )
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;


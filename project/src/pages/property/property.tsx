import CommentList from '../../components/comment-list/comment-list';
import CommentForm from '../../components/comment-form/comment-form';
import Features from '../../components/goods/goods';
import Header from '../../components/header/header';
import Gallery from '../../components/gallery/gallery';
import Host from '../../components/host/host';
import Map from '../../components/map/map';
import { useParams } from 'react-router-dom';
import CardList from '../../components/card-list/card-list';
import {useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchNearbyAction, fetchPropertyAction, postFavoriteAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/index';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import { getCity } from '../../store/city/selectors';
import { loadComments } from '../../store/comments/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { redirectToRoute } from '../../store/action';
import { loadNearby, loadProperty } from '../../store/offers/selectors';

const NEARBY_COUNT = 3;
const IMAGES_COUNT = 6;

function Property(): JSX.Element {
  const dispatch = useAppDispatch();

  const city = useAppSelector(getCity);
  const property = useAppSelector(loadProperty);
  const nearby = useAppSelector(loadNearby);
  const comments = useAppSelector(loadComments);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const {id} = useParams();
  const offerId = Number(id);
  const nearbyOffers = nearby.slice(0, NEARBY_COUNT);

  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth && property) {
      const offerStatus = property.isFavorite ? 0 : 1;
      dispatch(postFavoriteAction({
        id: property.id,
        status: offerStatus}));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  useEffect(() => {
    dispatch(fetchPropertyAction(offerId));
    dispatch(fetchNearbyAction(offerId));
  }, [dispatch, offerId]);

  if (!property) {
    return (
      <LoadingScreen />
    );
  }

  const pins = [...nearbyOffers, property];

  return(
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">

          <Gallery images={property.images.slice(0, IMAGES_COUNT)}/>

          <div className="property__container container">
            <div className="property__wrapper">
              {property.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {property.title}
                </h1>
                <button
                  className={`property__bookmark-button ${property.isFavorite && 'property__bookmark-button--active'} button`}
                  type="button"
                  onClick={handleClick}
                >
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {property.isFavorite ? 'In' : 'To'} bookmarks
                  </span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${property.rating / 5 * 100}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{property.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {property.bedrooms} {property.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="property__feature property__feature--adults">
                Max {property.maxAdults} {property.maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{property.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <Features features={property.goods}/>

              <Host offer={property}/>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews ·{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>

                {/* <CommentList offerId={offerId}/> */}

                {/* {authorizationStatus === AuthorizationStatus.Auth && */}
                <CommentForm offerId={offerId} />
                {/* // />} */}

              </section>
            </div>
          </div>

          <Map className="property__map" offers={pins} selectedPoint={offerId} city={city} />

        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <CardList offers={nearbyOffers} classList={['near-places__list']}/>

          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;

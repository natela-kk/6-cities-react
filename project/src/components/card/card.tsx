import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { redirectToRoute } from '../../store/action';
import { postFavoriteAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type OfferProps = {
  offer: Offer;
  onOfferHover?: (id: number) => void;
  onOfferLeave?:(id: null) => void;
  isSmall?: boolean;
}

function Card({offer, onOfferHover, onOfferLeave, isSmall = false}: OfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const modifier = isSmall ? 'favorites' : 'cities';
  const offerStatus = offer.isFavorite ? 0 : 1;

  const handleClick = () => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(postFavoriteAction({
        id: offer.id,
        status: offerStatus,
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return(
    <article
      className={`${isSmall ? 'favorites__card' : 'cities__place-card'} place-card`}
      onMouseOver={() => onOfferHover?.(offer.id)}
      onMouseLeave={() => onOfferLeave?.(null)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${modifier}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={`${isSmall ? 150 : 260}`}
            height={`${isSmall ? 110 : 200}`}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className={`${isSmall && 'favorites__card-info'} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button"
            onClick={handleClick}
          >
            <svg className="place-card__bookmark-icon shadow-root" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">`{offer.isFavorite ? 'In' : 'To'}` bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style = {{width: `${Math.round(offer.rating) / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}

export default Card;


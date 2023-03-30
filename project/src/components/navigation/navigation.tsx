import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function Navigation(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={authorizationStatus === AuthorizationStatus.NoAuth ? AppRoute.Login : AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {authorizationStatus === AuthorizationStatus.NoAuth ? (<span className="header__login">Sign in</span>) : (
              <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            )}
          </Link>
        </li>
        {authorizationStatus === AuthorizationStatus.Auth && (
          <li className="header__nav-item">
            <Link className="header__nav-link"
              to={AppRoute.Main}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

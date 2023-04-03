import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import logo from '../../img/logo.svg';

function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <Link to={AppRoute.Main} className="footer__logo-link">
        <img className="footer__logo"
          src={logo}
          alt="6 cities logo"
          width={64} height={33}
        />
      </Link>
    </footer>
  );}

export default Footer;


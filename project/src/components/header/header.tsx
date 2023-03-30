import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';


function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">

            <Logo />

          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;

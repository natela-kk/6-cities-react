import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks';
import {City} from '../../types/offer';
import cn from 'classnames';
import { changeCityAction } from '../../store/city/city';
import { Link } from 'react-router-dom';

type TabsProps = {
  currentsCity: string;
}

function Tabs({currentsCity}: TabsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = (targetCity: City): void => {
    dispatch(changeCityAction(targetCity));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li
              className="locations__item"
              onClick={() => {
                handleClick(city);
              }}
              key={city.name}
            >
              <Link to={''} className={cn('locations__item-link tabs__item', {'tabs__item--active': currentsCity === city.name})} >
                <span>{city.name}</span>
              </Link>
            </li>
          ),
          )}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;

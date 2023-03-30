import { useAppDispatch } from '../../hooks';
import { SORT_TYPE } from '../../const';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { changeSortTypeAction } from '../../store/sort/sort';

type SortProps = {
  sortType: string;
}

function Sort({sortType}: SortProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const sortRef = useRef(null);

  const handleSortClick = (e: any) => {
    if(e.target !== sortRef.current && open) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleSortClick);

    return () => {
      document.removeEventListener('click', handleSortClick);
    };
  });

  const dispatch = useAppDispatch();

  const handleClick = (sort: string): void => {
    dispatch(changeSortTypeAction(sort));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      {' '}
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpen(!open)} ref={sortRef}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom', {'places__options--opened ': open})}>
        {Object.entries(SORT_TYPE).map(([key, label]) => (
          <li
            key={key}
            className={cn('places__option', {'places__option--active': sortType === label})}
            tabIndex={0}
            onClick={() => {
              handleClick(label);
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;

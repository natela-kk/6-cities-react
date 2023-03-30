import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import {AppRoute} from '../../const';


function NotFoundScreen (): JSX.Element {
  return (
    <div className={styles.notFound}>
      <img src="img/error.png" alt='error'/>
      <p className={styles.error}>404</p>
      <p className={styles.errorText}>page not found</p>
      <Link to={AppRoute.Main} className={styles.link}>back to the main page</Link>
    </div>
  );
}

export default NotFoundScreen;

import * as Loader from 'react-loader-spinner';
import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.loader}>
      <Loader.BallTriangle
        ariaLabel="loading-indicator"
        width="100vw"
        color='grey'
      />
    </div>

  );
}

export default LoadingScreen;

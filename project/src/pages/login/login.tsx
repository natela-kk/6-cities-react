import Header from '../../components/header/header';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormEvent, useRef } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-zA-Z])/;
const PASSWORD_ERROR = 'Пароль должен состоять минимум из одной буквы и одной цифры';
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_ERROR = 'Введите корректный адрес электронной почты';


function Login(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  if(authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main}/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    evt.currentTarget.checkValidity();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  const handlePasswordChange = () => {
    if (passwordRef.current !== null) {
      const isValidPassword = PASSWORD_REGEXP.test(passwordRef.current.value);

      if (isValidPassword) {
        passwordRef.current.setCustomValidity('');
      } else {
        passwordRef.current.setCustomValidity(PASSWORD_ERROR);
      }
    }
  };

  const handleEmailChange = () => {
    if (emailRef.current !== null) {
      const isValidEmail = EMAIL_REGEXP.test(emailRef.current.value);

      if (isValidEmail) {
        emailRef.current.setCustomValidity('');
      } else {
        emailRef.current.setCustomValidity(EMAIL_ERROR);
      }
    }
  };


  return(
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;

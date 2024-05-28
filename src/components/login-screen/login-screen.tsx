import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { loginAction } from '../../store/api-actions';
import { AuthorizationStatus, RoutePaths } from '../../const';
import Logo from '../logo/logo';
import { getAuthorizationStatus } from '../../store/user-state/selectors';
import { AuthData } from '../../types/auth-data';

import './login-screen.css';

function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>({ mode: 'all' });

  const location = useLocation();
  const state = location.state as { from?: string };
  const from = state?.from || RoutePaths.Root;

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const handleFormSubmit: SubmitHandler<AuthData> = (data, evt) => {
    evt?.preventDefault();
    dispatch(loginAction(data));
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={{ pathname: from }} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                {errors.login && <p className="login__error">{errors.login.message}</p>}
                <input
                  className="login__input form__input"
                  type="text"
                  {...register('login', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                {errors.password && <p className="login__error">{errors.password.message}</p>}
                <input
                  className="login__input form__input"
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 2,
                      message: 'Password must be at least 2 characters long',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/,
                      message: 'Password must contain at least one letter and one number',
                    },
                  })}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
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

export default LoginScreen;

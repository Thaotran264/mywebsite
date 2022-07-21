import Cookie from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../store/globalState';
import { postData } from '../utils/fetchData';

const Signin = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { password, email } = userData;
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('auth/login', userData);

    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7,
    });
    localStorage.setItem('firstLogin', true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push('/');
    }
  }, [auth]);
  return (
    <div>
      <Head>
        <title>Sign in page</title>
      </Head>
      <form className="mx-auto my-4" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeInput}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We&aposll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>
        <p>
          You don&apost have an account?{' '}
          <Link href="/register">
            <a style={{ color: 'crimson' }}> Register</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;

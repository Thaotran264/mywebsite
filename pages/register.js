import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import valid from '../utils/valid';
import { DataContext } from '../store/globalState';
import { postData } from '../utils/fetchData';
import { useRouter } from 'next/router';

const Register = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '' };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;
const router = useRouter()
  const {state, dispatch} = useContext(DataContext);
const {auth } = state
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: errMsg },
      });

    dispatch({
      type: 'NOTIFY',
      payload: { loading: true },
    });

    const res = await postData('auth/register', userData);
    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  };

  useEffect(()=>{
    if(Object.keys(auth).length !== 0) {
      router.push('/')
    }
  }, [auth])
  return (
    <div>
      <Head>
        <title>Register page</title>
      </Head>
      <form className="mx-auto my-4" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>

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
          />
          <div id="emailHelp" className="form-text">
            We&aposll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mb-1">
          Login
        </button>
        <p>
          Already have an account?{' '}
          <Link href="/signin">
            <a style={{ color: 'crimson' }}> Login now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

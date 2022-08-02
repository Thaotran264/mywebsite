import { createContext, useEffect, useReducer, useState } from 'react';
import { getData } from '../utils/fetchData';
import reducers from './reducers';

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, cart: [], modal: {} };
  const [state, dispatch] = useReducer(reducers, initialState);
  const [show, setShow] = useState(false);

  const { cart } = state;
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      getData('auth/accessToken').then((res) => {
        if (res.err) return localStorage.removeItem('firstLogin');

        dispatch({
          type: 'AUTH',
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
  }, []);
  useEffect(() => {
    const next_cart = JSON.parse(localStorage.getItem('next_cart'));
    if (next_cart) dispatch({ type: 'ADD_CART', payload: next_cart });
  }, []);
  useEffect(() => {
    localStorage.setItem('next_cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <DataContext.Provider value={{ state, dispatch, show, setShow }}>
      {children}
    </DataContext.Provider>
  );
};

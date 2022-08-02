import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CartItem from '../components/CartItem';
import { DataContext } from '../store/globalState';
import { getData } from '../utils/fetchData';
const cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('next_cart'));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, price, images, inStock } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispatch({ type: 'ADD_CART', payload: newArr });
      };
      updateCart();
    }
  }, []);
  if (cart.length == 0)
    return (
      <img
        style={{ asspectRatio: '16/9' }}
        src="https://images.pexels.com/photos/236910/pexels-photo-236910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="https://images.pexels.com/photos/236910/pexels-photo-236910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="img-responsive w-100"
      />
    );
  return (
    <div className="row mx-auto">
      <Head>
        <title>Cart page</title>
      </Head>
      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">Shopping</h2>
        <table className="table my-3">
          <tbody>
            {cart.map((item) => (
              <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-md-4 my-3 text-end text-uppercase text-secondary">
        <form>
          <h2>Shipping</h2>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            className="form-control mb-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            className="form-control mb-2"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </form>

        <h3>
          Total: <span className="text-danger">${total}</span>{' '}
        </h3>
        <Link href={auth.user ? '' : '/signin'}>
          <a className="btn btn-dark text-light">Proceed with payment</a>
        </Link>
      </div>
    </div>
  );
};

export default cart;

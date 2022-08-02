import Head from 'next/head';
import React, { useContext } from 'react';
import CartItem from '../components/CartItem';
import { DataContext } from '../store/globalState';
const cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
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
    </div>
  );
};

export default cart;

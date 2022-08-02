import Link from 'next/link';
import React, { useContext } from 'react';
import { BsTrash } from 'react-icons/bs';
import { decrease, increase } from '../store/actions';
import { DataContext } from '../store/globalState';

const CartItem = ({ item, dispatch, cart }) => {
  const { show, setShow } = useContext(DataContext);
  const handleDelete = () => {
    setShow(true);
    dispatch({ type: 'ADD_MODAL', payload: { data: cart, id: item._id, title: item.title } });
  };
  return (
    <tr>
      <td style={{ width: '100px', overflow: 'hidden' }}>
        <img
          src={item.images[0].url}
          alt=""
          className="img-thumbnail w-100"
          style={{ minWidth: '80px', height: '80px' }}
        />
      </td>
      <td style={{ minWidth: '200px' }} className="align-middle">
        <h5 className="text-secondary text-capitalize">
          <Link href={`/product/${item._id}`}>
            <a>{item.title}</a>
          </Link>
        </h5>
        <h6 className="text-danger">${item.quantity * item.price}</h6>
        {item.inStock > 0 ? (
          <p className="mb-1 text-danger">In Stock: {item.inStock}</p>
        ) : (
          <p className="mb-1 text-danger">Out Stock</p>
        )}
      </td>
      <td className="align-middle" style={{ minWidth: 150 }}>
        <button
          className="btn btn-outline-secondary"
          disabled={item.quantity == 1}
          onClick={() => dispatch(decrease(cart, item._id))}
        >
          -
        </button>
        <span className="px-3">{item.quantity}</span>
        <button
          className="btn btn-outline-secondary"
          disabled={item.quantity == item.inStock}
          onClick={() => dispatch(increase(cart, item._id))}
        >
          +
        </button>
      </td>

      <td className="align-middle" style={{ minWidth: 50, cursor: 'pointer' }}>
        <BsTrash className="text-danger" onClick={handleDelete} />
      </td>
    </tr>
  );
};

export default CartItem;

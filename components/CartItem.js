import Link from 'next/link';
import React from 'react';

const CartItem = ({ item, dispatch, cart }) => {
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
      <td style={{ minWidth: '200px' }} className="w-50 align-middle">
        <h5 className="text-secondary text-capitalize">
          <Link href={`/product/${item._id}`}>
            <a>{item.title}</a>
          </Link>
        </h5>
        <h6 className="text-danger">${item.quantity * item.price}</h6>
        {item.inStock > 0 ? (
          <p className="mb-1 text-danger">In Stock: {item.inStock}</p>
        ) : (
          <p className="text-danger">Out Stock</p>
        )}
      </td>
    </tr>
  );
};

export default CartItem;

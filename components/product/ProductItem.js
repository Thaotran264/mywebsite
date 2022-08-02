import { createHeaderRoute } from 'next/dist/server/server-route-utils';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { addToCart } from '../../store/actions';
import { DataContext } from '../../store/globalState';

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const groupButton = () => {
    return (
      <div className="d-flex justify-content-between gap-2">
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info flex-fill text-white">View</a>
        </Link>
        <button
          className="btn btn-success flex-fill text-white"
          disabled={product.inStock == 0}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </div>
    );
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.images[0].url} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <div className="d-flex justify-content-between">
          <h6 className="text-danger">${product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className="text-danger">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
        </div>
        <Card.Text>{product.description}</Card.Text>
        {groupButton()}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;

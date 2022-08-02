import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../store/globalState';
import { addToCart } from '../../store/actions';

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const isActive = (index) => {
    if (tab == index) return 'active';
    return '';
  };

  return (
    <div className="row detail_page">
      <Head>
        <title>Detail Page</title>
      </Head>

      <div className="col-md-6">
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className="img-thumbnail d-block rounded mt-4 w-100"
          style={{ height: 350 }}
        />
        <div className="row mx-0 py-1 cursor gap-2" style={{ cursor: 'pointer' }}>
          {product.images.map((item, index) => (
            <img
              key={index}
              src={item.url}
              alt={item.url}
              className={`img-thumbnail ${isActive(index)}`}
              style={{ height: 80, width: '20%' }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6 mt-3">
        <h2 className="text-uppercase">{product.title}</h2>
        <h5 className="text-danger">{product.price}</h5>

        <div className="d-flex justify-content-between">
          {product.inStock > 0 ? (
            <h6 className="text-danger">In stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
          <h6 className="text-danger">Sold: {product.sold}</h6>
        </div>

        <div className="my-2">{product.description}</div>
        <div className="my-2">{product.content}</div>
        <div className="my-2">{product.content}</div>
        <div className="my-2">{product.content}</div>

        <button
          className="btn btn-dark d-block my-3 px-5"
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default DetailProduct;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  console.log(res);
  return {
    props: {
      product: res.product,
    },
  };
}

import Head from 'next/head';
import { useState } from 'react';
import ProductItem from '../components/product/ProductItem';
import {getData} from '../utils/fetchData';

export default function Home(props) {
  const [products, setProducts] = useState(props.products)
  // const [products, setProducts] = useState([])
console.log(products)
  return (<div className='products'>
    <Head>
      <title>Home Page</title>
    </Head>

    {
      products.length == 0 ?
      <h2>No Products</h2> 
      : products?.map(product => (
        <ProductItem key={product.id} product={product}></ProductItem>
      ))
    }
  </div>);
}

export async function getServerSideProps() {
    // console.log('second', process.env.BASE_URL);
  const res = await getData('product');
  return {
    props: {
      products: res.products,
      result: res.result
    },
  };
};

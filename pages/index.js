import {getData} from '../utils/fetchData';

export default function Home(props) {
  return <h2>Home</h2>;
}

export const getServerSideProps = async () => {
  // console.log('second', process.env.BASE_URL);
  const res = await getData('product');
  console.log(res);
  return {
    props: {},
  };
};

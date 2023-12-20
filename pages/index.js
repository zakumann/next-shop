import Head from 'next/head';
import Title from '../components/Title';
import { getProducts } from '../lib/products';
import Link from 'next/link';

export async function getStaticProps(){
    console.log('[HomePage] getStaticProps()');
    const products = await getProducts();
    return {
      props: { products },
      revalidate: 5* 60, // seconds
    };
}

export default function HomePage({ products}) {
    console.log('[HomePage] render:', products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                  {product.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
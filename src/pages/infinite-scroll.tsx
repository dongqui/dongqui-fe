import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { useRef } from 'react';
import styled from 'styled-components';
import { QueryClient, dehydrate } from 'react-query';

import ProductList from '../components/ProductList';
import { useProductsInfiniteQuery, useIntersectionObserver } from '../hooks'
import { getProducts } from '../remotes';
import { INFINITE_PRODUCT_COUNT_PER_PAGE } from '../contstants';

// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient()
//   await queryClient.prefetchQuery(['products_infinite'], () =>  getProducts(1, INFINITE_PRODUCT_COUNT_PER_PAGE));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }  
// }

const InfiniteScrollPage: NextPage = () => {
  const bottom = useRef<HTMLDivElement>(null)
  const { data, hasNextPage, fetchNextPage, isFetching } = useProductsInfiniteQuery();
  const entry = useIntersectionObserver(bottom, {});

  if (entry?.isIntersecting && hasNextPage) {
    fetchNextPage();
  }
  
  return (
    <> 
      <Container>
        {data?.pages.map((group, i) => <ProductList key={i} products={group?.products || []} />) }
      </Container>

      <div ref={bottom}/>
      {isFetching && <div>Loading...</div>}
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

import Link from 'next/link';
import type { NextPage } from 'next';
import { useRef } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import { useProductsInfiniteQuery, useIntersectionObserver } from '../hooks'

const InfiniteScrollPage: NextPage = () => {
  const bottom = useRef<HTMLDivElement>(null)
  const { data, hasNextPage, fetchNextPage, isFetching } = useProductsInfiniteQuery();
  const entry = useIntersectionObserver(bottom, {});

  if (entry?.isIntersecting && hasNextPage) {
    fetchNextPage();
  }
  
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Container>
        {data?.pages.map((group, i) => <ProductList key={i} products={group?.products || []} />) }
      </Container>

      <div ref={bottom}/>
      {isFetching && <div>Loading...</div>}
    </>
  );
};

export default InfiniteScrollPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

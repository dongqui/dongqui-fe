import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import styled from 'styled-components';
import { QueryClient, dehydrate } from 'react-query';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { useProductsQuery } from '../hooks'
import { getProducts } from '../remotes';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = (!query.page || Array.isArray(query.page)) ? '1' : query.page;

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['products', page], () => getProducts(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }  
}

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = (!router.query.page || Array.isArray(router.query.page)) ? '1' : router.query.page;
  const { data } = useProductsQuery(page);
  
  const handleChangePage = (page: number) => {
    router.push(`/pagination?page=${page}`, undefined, { shallow: true });
  }

  if (!data) {
    return null;
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
        <ProductList products={data?.products || []} />
        <Pagination totalCount={data?.totalCount} currentPage={+page} onChangePage={handleChangePage}/>
      </Container>
    </>
  );
};

export default PaginationPage;

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

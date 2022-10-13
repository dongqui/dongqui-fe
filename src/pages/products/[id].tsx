import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { QueryClient, dehydrate } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary'

import { getProduct } from '../../remotes';
import { useProductQuery } from '../../hooks';

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const id = query.id;
// 	const queryClient = new QueryClient()
	
//   // await queryClient.fetchQuery(['product'], () => getProduct(id as string));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }


const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const id = Array.isArray(router?.query?.id) ? router?.query?.id.join('') : router?.query?.id || '';
  const { data } = useProductQuery(id);
  
  return (
    <>      
      <Thumbnail src={data?.product?.thumbnail ? data?.product?.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{data?.product?.name}</Name>
        <Price>{data?.product?.price?.toLocaleString('ko-KR')}원</Price>
      </ProductInfoWrapper>
    </>
  );
};

export default ProductDetailPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

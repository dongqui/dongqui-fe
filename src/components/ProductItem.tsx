import styled from 'styled-components';
import Link from 'next/link';

import { Product } from '../types';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => (
  <Container>
    <Link href={`/products/${id}`}>
      <a>
        <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
        <Name>{name}</Name>
        <Price>{price.toLocaleString('ko-KR')}원</Price>
      </a>      
    </Link>  
  </Container>  
);

export default ProductItem;

const Container = styled.li`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.h4`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.span`
  margin-top: 4px;
`;

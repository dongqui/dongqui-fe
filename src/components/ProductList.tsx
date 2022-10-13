import styled from 'styled-components';

import { Product } from '../types';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => (
  <Container>
    {products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </Container>
);

export default ProductList;

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;

import { useQuery } from 'react-query';
import { AxiosError} from 'axios';
import type { ProductsResult } from '../types';
import { getProducts } from '../remotes';

const useProductsQuery = (page: string | number = 0) => {
  return useQuery<ProductsResult, AxiosError>(['products', page], () => getProducts(page), { keepPreviousData : true });
}

export default useProductsQuery;
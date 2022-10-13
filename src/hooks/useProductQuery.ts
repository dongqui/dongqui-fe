import { useQuery } from 'react-query';
import { AxiosError} from 'axios';

import type { ProductResult } from '../types';
import { getProduct } from '../remotes';

const useProductQuery = (id: string) => {
  return useQuery<ProductResult, AxiosError>(['product', id], () => getProduct(id), {    
    retry: false,
    enabled: id !== undefined,
  });
}

export default useProductQuery;
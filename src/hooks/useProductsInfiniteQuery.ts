import { useInfiniteQuery } from 'react-query';

import { getProducts } from '../remotes';
import { INFINITE_PRODUCT_COUNT_PER_PAGE } from '../contstants';

const useProductsInfiniteQuery = (pageSize = INFINITE_PRODUCT_COUNT_PER_PAGE) => {
  return useInfiniteQuery(['products_infinite'], ({ pageParam = 1}) => getProducts(pageParam, pageSize), {
    getNextPageParam(lastPage, pages) {
      if (lastPage.products.length === pageSize) {
        return pages.length + 1;
      }
      return undefined;
    },  
  })
}

export default useProductsInfiniteQuery;
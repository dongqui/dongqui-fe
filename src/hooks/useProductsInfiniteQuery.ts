import { useInfiniteQuery } from 'react-query';

import { getProducts } from '../remotes';

const DEFAULT_PRODUCT_COUNT_PER_PAGE = 16;

const useProductsInfiniteQuery = (pageSize = DEFAULT_PRODUCT_COUNT_PER_PAGE) => {
  return useInfiniteQuery(['products'], ({ pageParam = 1}) => getProducts(pageParam, pageSize), {
    getNextPageParam(lastPage, pages) {
      if (lastPage.products.length === DEFAULT_PRODUCT_COUNT_PER_PAGE) {
        return pages.length + 1;
      }
      return undefined;
    },  
  })
}

export default useProductsInfiniteQuery;
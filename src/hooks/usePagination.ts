import { useEffect } from 'react';
import { useState } from 'react';

export interface UsePaginationParams {
  totalCount: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  itemCountPerPage?: number;
  pageCountPerSection?: number;
}

const DEFAULT_PAGE_SECTION_SIZE = 5;
const DEFAULT_COUNT_PER_PAGE = 10;

const usePagination = ({
  totalCount,
  currentPage,
  onChangePage,
  itemCountPerPage = DEFAULT_COUNT_PER_PAGE,
  pageCountPerSection = DEFAULT_PAGE_SECTION_SIZE,
}: UsePaginationParams) => {
  const [selectedPage, setSelectedPage] = useState<number>(currentPage);

  useEffect(() => {
    onChangePage(selectedPage);
  }, [selectedPage, onChangePage])

  const pageOffset = (Math.ceil(selectedPage / pageCountPerSection) - 1) * pageCountPerSection;
  const lastPage = Math.ceil(totalCount / itemCountPerPage);

  const pages = Array.from(Array(pageCountPerSection), (_, i) => i + 1 + pageOffset).filter(page => page <= lastPage);   
  
  const prevPageSectionDisabled = pages[0] === 1;
  const nextPageSectionDisabled = pages[pages.length - 1] === lastPage;
  return {
    pages,
    selectedPage,
    setSelectedPage,
    goToPrevPageSection() {
      if (!prevPageSectionDisabled) {
        setSelectedPage(pageOffset - pageCountPerSection + 1);
      }
    },
    goToNextPageSection() {
      if (!nextPageSectionDisabled) {
        setSelectedPage(pageOffset + pageCountPerSection + 1);
      }
    },
    prevPageSectionDisabled,
    nextPageSectionDisabled,
  }
}

export default usePagination;
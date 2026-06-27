export const PAGE_SIZE_OPTIONS = [10, 25, 50];

export const getPageNumbers = (currentPage: number, totalPages: number) => {
  const firstPage = Math.max(1, currentPage - 1);
  const lastPage = Math.min(totalPages, currentPage + 1);
  const pages = [];

  for (let page = firstPage; page <= lastPage; page += 1) {
    pages.push(page);
  }

  return pages;
};

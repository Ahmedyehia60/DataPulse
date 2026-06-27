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
export const formatOrderDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US");

export const formatCurrency = (value: string | number) =>
  `$${Number(value).toFixed(2)}`;

export const statusClassName = (status: string) =>
  status === "active"
    ? "bg-green-100 text-green-700"
    : "bg-amber-100 text-amber-700";

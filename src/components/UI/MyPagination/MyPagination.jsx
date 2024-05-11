import { usePagination } from '../../../hooks/usePagination';

/* eslint-disable react/prop-types */
const MyPagination = ({ totalPages, page, changePage }) => {
  const pagesArray = usePagination(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map((p, idx) => {
        if (idx > 6) return;
        return (
          <span
            onClick={() => changePage(p)}
            className={page === p ? 'page page__current' : 'page'}
            key={p}>
            {p}
          </span>
        );
      })}
    </div>
  );
};

export default MyPagination;

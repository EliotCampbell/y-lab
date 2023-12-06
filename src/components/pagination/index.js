import React from 'react';
import './style.css';

function Pagination({ maxElements = 1, currentPage, onPageChange, limit = 10}) {
  const totalPages = Math.ceil(maxElements / limit);

  const getPageNumbers = (currentPage, totalPages) => {

    const pages = [];
     // Количество страниц, которые будут отображаться вокруг текущей страницы
    currentPage === totalPages && pages.push(totalPages-2)

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pages.push(i);
    }
    currentPage === 1 && pages.push(3)
    return pages;
  };

  const handlePageChange = (page) => {
      onPageChange(page)
  };

  return (
    <div className={'pagination'}>
      {currentPage > 2 &&
        <>
          <div className={'pagination-button'} onClick={() => handlePageChange(1)}>{'1'}</div>
        </>
      }
      {currentPage > 3 &&
        <>
          <div className={'pagination-button_slitter'}>{'...'}</div>
        </>
      }

        {getPageNumbers(currentPage, totalPages).map((page) => (
          <div key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? 'pagination-button active' : 'pagination-button'}>
            {page}
          </div>
        ))}

      {currentPage < (totalPages - 2) &&
        <>
          <div className={'pagination-button_slitter'}>{'...'}</div>
        </>
      }
      {currentPage < (totalPages - 1) &&
        <>
          <div className={'pagination-button'} onClick={() => handlePageChange(totalPages)}>{totalPages}</div>
        </>
      }
    </div>
  );
}

export default Pagination;
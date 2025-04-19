// components/Common/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 5;

    if (showEllipsis) {
      // Always show first page
      pages.push(1);

      // Show ellipsis if needed
      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    } else {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center items-center mt-10'>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        Previous
      </button>

      <div className='flex mx-2'>
        {getPageNumbers().map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className='px-2 py-2'>
              ...
            </span>
          ) : (
            <button
              key={`page-${item}`}
              onClick={() => onPageChange(item)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === item
                  ? 'bg-[#FCDF5A] text-black'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

import { memo, useCallback } from 'react';
import './style.css';

function PaginationContainer({ pagination, setPage, page }) {
    const callbacks = {
        // Меняем страницу
        changePage: useCallback(newPage => setPage(newPage), []),
      };


return (
      <div className="pagination-container">
        <div className="pagination">
          {pagination.map((pageNumber, index) =>
            pageNumber === '...' ? (
              <span key={index} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button key={index} className={pageNumber === page ? 'active' : ''} onClick={() => callbacks.changePage(pageNumber)} disabled={pageNumber === page}>
                {pageNumber}
              </button>
            ),
          )}
        </div>
      </div>      
  );
}

export default memo(PaginationContainer);
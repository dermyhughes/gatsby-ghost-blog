import * as React from 'react';
import { Link } from 'gatsby';

interface PageContext {
  previousPagePath?: string;
  nextPagePath?: string;
  humanPageNumber: number;
  numberOfPages: number;
}

interface PaginationProps {
  pageContext: PageContext;
}

const Pagination = ({ pageContext }: PaginationProps) => {
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext;

  return (
    <nav className='pagination' role='navigation'>
      <div>
        {previousPagePath && (
          <Link to={previousPagePath} rel='prev'>
            Previous
          </Link>
        )}
      </div>
      {numberOfPages > 1 && (
        <div className='pagination-location'>
          Page {humanPageNumber} of {numberOfPages}
        </div>
      )}
      <div>
        {nextPagePath && (
          <Link to={nextPagePath} rel='next'>
            Next
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;

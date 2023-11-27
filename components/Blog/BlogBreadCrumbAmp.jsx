import React, {useState, useEffect} from "react";

const BlogBreadCrumbAmp = ({getBlogListing, pageCount}) => {
  const [newPageNumber, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [button, setButton] = useState("");
  const [count, setCount] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pageCount / 10); i++) {
    pageNumbers.push(i);
  }
  const handleActiveButton = (text) => {
    setButton(text);
  };
  const itemsPerPage = 5;
  useEffect(() => {
    console.log(pageCount,'insdei pageCount')
    let pNumbers = pageNumbers;
    let nNumbers = pNumbers.slice(0, itemsPerPage);
    setPageNumbers(nNumbers);
  }, [pageCount]);

  const goToNextPage = () => {
    const currentPage = newPageNumber[newPageNumber.length - 1];
    setCurrentPage(currentPage);
    const nextPage = currentPage + 1;
    if (nextPage <= pageNumbers.length) {
      const startIndex = pageNumbers.indexOf(nextPage);
      const endIndex = Math.min(startIndex + itemsPerPage, pageNumbers.length);
      const newNumbers = pageNumbers.slice(startIndex, endIndex);
      setPageNumbers(newNumbers);
    }
  };

  const goToPreviousPage = () => {
    const currentPage = newPageNumber[0];
    setCurrentPage(currentPage);
    const previousPage = currentPage - 1;
    if (previousPage >= 1) {
      const endIndex = pageNumbers.indexOf(currentPage);
      const startIndex = Math.max(endIndex - itemsPerPage, 0);
      const newNumbers = pageNumbers.slice(startIndex, endIndex);
      setPageNumbers(newNumbers);
    }
  };
  return (
    <>
      <div id="blog-breadcrumbs" style={{display: 'flex',flexDirection: 'row',justifyContent: 'center',
                  alignItems: 'center',width: '100%',marginTop: '34px',paddingBottom: '20px',gap: '24px'}}>
        <ul style={{margin: '0px',padding: '0px',display: 'flex',flexDirection: 'row',
        justifyContent: 'center',alignItems: 'center',listStyle: 'none',gap:'20px'}}>
          {currentPage > 1 && (
            <div
              id={button == "prev" ? "prev-active" : ""}
              onClick={() => {
                handleActiveButton("prev");
                goToPreviousPage();
              }}
            >
              <span>{"<"}</span>Prev
            </div>
          )}
          {newPageNumber.length > 0 &&
            newPageNumber.map((page, index) => {
              return (
                <li
                  onClick={() => {
                    getBlogListing(page);
                    setCount(page);
                  }}
                  id={count == page ? "active-li" : ""}
                >
                  {page}
                  {count == page && <span id="active-page"></span>}
                </li>
              );
            })}
        </ul>
        {currentPage < pageCount && (
          <div
            id={button == "next" ? "next-active" : ""}
            onClick={() => {
              handleActiveButton("next");
              goToNextPage();
            }}
          >
            Next<span>{">"}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogBreadCrumbAmp;

import React, { useState } from "react";

const Pagination = ({ pages, fetchGames, nextPage, previousPage }) => {
  const [activepage, setActivepage] = useState(1);
  const pageLinks = [];
  const classname = "pagination-li";

  const handleClick = (page) => {
    fetchGames(page);
    setActivepage(page);
  };

  for (let i = 1; i <= pages; i++) {
    pageLinks.push(
      <li
        key={i}
        className={classname + (activepage === i ? " active" : "")}
        onClick={() => handleClick(i)}
      >
        <span>{i}</span>
      </li>
    );
  }

  return (
    <div className="pagination justify-content-center">
      <ul>
        {previousPage && (
          <li
            id="previous-icon"
            className={classname}
            onClick={() => handleClick(activepage - 1)}
          >
            <div className="span-wrapper">
              <i className="mr-2 fas fa-arrow-left"></i>
            </div>
          </li>
        )}
        {pageLinks}
        {nextPage && (
          <li
            id="next-icon"
            className={classname}
            onClick={() => handleClick(activepage + 1)}
          >
            <div className="span-wrapper">
              <i className="ml-2 fas fa-arrow-right"></i>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;

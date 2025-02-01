import React, { useState } from "react";
import "./Search.css";

function Search({ filterFunction }) {
  const [searchText, setSearchText] = useState("");

  function handleSearch(e) {
    const value = e.target.value;
    setSearchText(value);
    filterFunction(value); // Update the search query in Home page
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search here..."
      />
      <button onClick={() => filterFunction(searchText)}>🔍</button>
    </div>
  );
}

export default Search;

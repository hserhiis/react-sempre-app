import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../features/search/searchSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(""));
    dispatch(setSearchValue(searchText));
    setSearchText("");
  };

  return (
    <div className="search-input">
      <form>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search for your pizza..."
        />

        <button onClick={handleSubmit} type="submit">
          <lord-icon
            src="https://cdn.lordicon.com/wjyqkiew.json"
            trigger="hover"
            className="search-icon"
            colors="primary:#fff,secondary:#ffffff">
          </lord-icon>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

import React from "react";
import SearchImg from "./../../assets/svg/search.svg";
import "./SearchInput.scss";

const SearchInput = ({ ...props }) => {
  return (
    <form className="searchInput">
      <input
        className="searchInput__input"
        value={props.searchInput}
        placeholder="Поиск по названию..."
        onChange={(e) => props.setSearchInput(e.target.value.toLowerCase())}
        type="text"
      />
      <img className="searchInput__btn_img" src={SearchImg} />
    </form>
  );
};

export default SearchInput;

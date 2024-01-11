"use client";

import { useState } from "react";

import { SearchType } from ".";

const SearchBar = () => {

    const [type, setType] = useState('');

    const handleSearch = () => {}

  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchType 
            type={type}
            setType={setType}
            />
        </div>

    </form>
  )
}

export default SearchBar
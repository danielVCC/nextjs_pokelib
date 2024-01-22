"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchType } from ".";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

const SearchBar = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type.trim() === "" && name.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(name.toLowerCase(), type.toLowerCase());
  };

  const updateSearchParams = (name: string, type: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'name' search parameter based on the 'name' value
    if (name) {
      searchParams.set("name", name);
    } else {
      searchParams.delete("name");
    }

    // Update or delete the 'type' search parameter based on the 'type' value
    if (type) {
      searchParams.set("type", type);
    } else {
       searchParams.delete("type");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname, {scroll: false});
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchType
          type={type}
          setType={setType}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/pokeball.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='pokemon name'
        />
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
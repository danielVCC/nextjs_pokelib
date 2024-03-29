"use client";

import { Combobox, Transition } from "@headlessui/react";

import { SearchTypeProps } from "@/types";

import { pokemonTypes } from "@/constants";

import Image from "next/image";

import { useState, Fragment } from "react";

const SearchType = ( {type, setType}: SearchTypeProps ) => {
const [query, setQuery] = useState('')

const filteredPokemonTypes =
query === ""
  ? pokemonTypes
  : pokemonTypes.filter((item) =>
      item
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    );

  return (
    <div className="search-type">
        <Combobox value={type} onChange={setType}>
            <div className="relative w-full">
                <Combobox.Button className="absolute top-[14px]">

                    <Image src={`/type-icon-${type}.svg`} width={20} height={20} className="ml-4" alt="type-icon"/>

                </Combobox.Button>

                <Combobox.Input 
                    className="search-type__input" 
                    placeholder="Type includes..." 
                    displayValue={(type: string) => type}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Transition 
                    as={Fragment} 
                    leave="transition ease-in duration-100" 
                    leaveFrom="opacity-100" 
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                    >

                    <Combobox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black 
                            ring-opacity-5 focus:outline-none sm:text-sm z-50"
                            static
                        >
                        {filteredPokemonTypes.length === 0 && query !== '' ? (
                            <Combobox.Option
                            value={query}
                            className="search-pokemonType__option"
                            >
                            Create "{query}"
                            </Combobox.Option>
                        ) : (
                            filteredPokemonTypes.map((item) => (
                            <Combobox.Option
                                key={item}
                                className={({ active }) =>
                                `relative search-pokemonType__option ${
                                    active ? "bg-primary-blue text-white" : "text-gray-900"
                                }`
                                }
                                value={item}
                            >
                                {({ selected, active }) => (
                                <>
                                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                    {item}
                                    </span>

                                    {/* Show an active blue background color if the option is selected */}
                                    {selected ? (
                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                                    ></span>
                                    ) : null}
                                </>
                                )}
                            </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>

                </Transition>

            </div>
        </Combobox>
    </div>
  )
}

export default SearchType
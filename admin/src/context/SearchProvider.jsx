import React, { createContext, useState } from 'react'
import { useContext } from 'react';
import { searchPost } from '../api/post';

const SearchContext = createContext();

const SearchProvider = ({children}) => {

  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = async (query) => {
    const {error, posts} = await searchPost(query);
    if(error) return console.log(error);
    setSearchResult(posts);
  }

  const resetSearch = (query) => {
    setSearchResult([]);
  }

  return (
    <SearchContext.Provider value={{searchResult, handleSearch, resetSearch}}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider;

export const useSearch = () => useContext(SearchContext);
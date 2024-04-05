import React, {createContext, useState, useContext} from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterContextProvider = ({children}) => {
  const [filter, setFilter] = useState('all');

  return (
    <FilterContext.Provider value={{filter, setFilter}}>
      {children}
    </FilterContext.Provider>
  );
}
'use client'
import React,{ChangeEvent, FC} from 'react'
import useSearchStore from '../../../../state/useSearchStore';

const SearchBox:FC = () => {
    const { searchTerm,setSearchTerm } = useSearchStore();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
  return (
    <div className="relative w-full gap-2 p-4 grid-custom ">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-blue-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
    )
}

export default SearchBox
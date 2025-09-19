"use client";

import { Search } from "lucide-react";

function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <div className='md:col-span-2'>
      <div className='relative'>
        <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
        <input
          type='text'
          placeholder='جستجو در نام، تخصص، مهارت...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full pr-12 pl-4 py-3  border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
        />
      </div>
    </div>
  );
}

export default SearchInput;

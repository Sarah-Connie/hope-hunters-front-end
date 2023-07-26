import { useState } from 'react';
import axios from '../api/axios';

const SearchBar = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/missing/search/${searchTerm}`);
      onSearchResult(response.data);
    } catch (error) {
      console.error('Error searching for missing persons:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex w-full'>
      <input
        className='w-3/5 border border-blue p-3 m-3'
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for missing persons..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

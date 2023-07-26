import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearchResult, originalReports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const handleSearch = async () => {
    try {
      const response = await axios.get(`/missing/search/${searchTerm}`);
      onSearchResult(response.data);

      // change url to display search query based on params
      const searchParams = new URLSearchParams({ searchQuery: searchTerm });
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, '', newUrl);

    } catch (error) {
      console.error('Error searching for missing persons:', error);
    }
  };

  // when the user clicks clear, nav to home route 
  // render originalReports (reports from initial api call)
  const handleClear = () => {
    setSearchTerm('');
    navigate("/");
    onSearchResult(originalReports);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('searchQuery') || '');
  }, []);

  return (
    <div className='flex w-full'>
      <input
        className='w-3/5 md:w-2/5 border border-blue p-1 md:p-3 m-3 rounded'
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for missing persons..."
      />
      <button 
      className='bg-lightblue rounded h-9 md:h-12 mt-3 m-2 ml-0 p-3 md:p-6 flex items-center'
      onClick={handleSearch}>
        Search
      </button>
      <button
        className='bg-lightblue rounded h-9 w-15 md:h-12 mt-3 m-2 ml-0 p-3 md:p-6 flex items-center'
        onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;

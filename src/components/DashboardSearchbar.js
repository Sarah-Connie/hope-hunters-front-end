import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardSearchBar = ({ onSearchResult, reports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');

  

  const handleSearch = async () => {
    try {
      setSearchError('');

      if (searchTerm.trim() === '') {
        setSearchError('Please enter a valid search term.');
        return;
      }

    const authToken = `Bearer ${sessionStorage.getItem('token')}`;
      
    const response = await axios.get(`/missing/users/search/${searchTerm}`, {
        headers: {
            Authorization: authToken,
        },
    });


      // Update the reports state in the Dashboard component with the search results
      onSearchResult(response.data);

      const searchParams = new URLSearchParams({ searchQuery: searchTerm });
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, '', newUrl);
    } 
      catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchError('Search is currently unavailable. Please try again later.');
      } else {
        setSearchError('Error fetching data. Please try again later.');
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('searchQuery') || '');
    }, []);

    
  const handleClear = () => {
    setSearchTerm('');
    setSearchError('');
  };


  return (
    <div className={`flex flex-col p-2 md:p-4`}>
        <div className={`flex flex-col w-full items-center font-main justify-between`}>
            <div className={`flex md:flex-row w-full items-center`}>
            <input
                className={`w-3/6 text-xs md:text-md lg:text-base md:w-5/6 h-8 md:h-10 m-3 mb-0 p-1 md:p-3 border border-blue rounded`}
                type="text"
                value={searchTerm}
                placeholder="Search for reports..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
                }}
            />
            <button
                className={`bg-lightblue h-8 mt-3 ml-0 p-3 md:p-6 flex items-center rounded hover:bg-yellow hover:scale-105 ease-out duration-200 text-white`}
                onClick={handleSearch}
                >
                Search
                </button>
                <button
                className={`bg-lightblue rounded h-8 w-15 md:h-12 mt-3 ml-2 p-3 md:p-6 flex items-center hover:bg-yellow hover:scale-105 ease-out duration-200 text-white`}
                onClick={handleClear}
                >
                Clear
                </button>
            </div>
            {searchError && <p className="w-full pl-3 text-red-500 text-xs italic items-start">{searchError}</p>}
        </div>
    </div>
  );
};

export default DashboardSearchBar;


 
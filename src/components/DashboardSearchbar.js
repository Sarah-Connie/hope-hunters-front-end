import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from '../api/axios';

const DashboardSearchBar = ({ onSearchResult, reports, originalReports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const { user } = useAuth;

  const userType = user && (!user.police && !user.admin) ? 'general' : 'police/admin';
  const apiEndpoint = userType === 'general' ? '/users/missing/search' : '/missing/search';

    
  const handleSearch = async () => {
    try {
      setSearchError('');

      if (searchTerm.trim() === '') {
        setSearchError('Please enter a valid search term.');
        return;
      }

      // Check if the search term contains letters
      const hasLetters = searchTerm.match(/[a-zA-Z]/g);

      // Check if the search term contains digits
      const hasDigits = searchTerm.match(/\d/g);

      // If the search term contains both letters and digits, show error
      if (hasLetters && hasDigits) {
        setSearchError("Invalid search. Please try again.");
        onSearchResult(originalReports);
      } // If the search term contains only digits and there are 4 or more digits, show error
      else if (!hasLetters && hasDigits && hasDigits.length > 4) {
        setSearchError("Invalid search. Please try again.");
        onSearchResult(originalReports);
      } // If the search term contains less than three letters, show error
      else if (hasLetters && hasLetters.length < 3) {
        setSearchError("Incomplete search. Please try again.");
        onSearchResult(originalReports);
      } 

        const authToken = `Bearer ${sessionStorage.getItem('token')}`;
        
        const response = await axios.get(`${apiEndpoint}/${searchTerm}`, 
          {
            headers: {
                Authorization: authToken,
            },
          }
        );
        
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
    // When the search term becomes empty, show the original reports again
    // empty searchbar means no search has been made or new search is desired
    if (searchTerm === '') {
      onSearchResult(originalReports);
      setSearchError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('searchQuery') || '');
    }, []);

    
  const handleClear = () => {
    setSearchTerm('');
    setSearchError('');
    onSearchResult(originalReports);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);

    // Update the URL to reflect the search term as it changes
    if (event.target.value === '' && JSON.stringify(originalReports)) {
      const newUrl = '/';
      window.history.replaceState(null, '', newUrl);
    } else {
      const searchParams = new URLSearchParams({ searchQuery: event.target.value });
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

    // Update the URL to reflect the search term as it changes
    useEffect(() => {
        if (searchTerm === '') {
          const newUrl = '/';
          window.history.replaceState(null, '', newUrl);
        } else {
          const searchParams = new URLSearchParams({ searchQuery: searchTerm });
          const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
          window.history.replaceState(null, '', newUrl);
        }
      }, [searchTerm]);


  return (
    <div className={`flex flex-col p-2 md:py-2`}>
        <div className={`flex flex-col w-full items-center font-main justify-evenly`}>
            <div className={`flex md:flex-row w-full items-center font-main justify-between md:justify-center`}>
            <input
                className={`w-3/6 text-xs md:text-md lg:text-base md:w-5/6 h-8 md:h-10 mr-2 md:m-3 mb-0 p-1 md:p-3 border border-blue rounded`}
                type="text"
                value={searchTerm}
                placeholder="Search for reports..."
                onChange={handleChange}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
                }}
            />
            <button
                className={`bg-lightblue h-8 ml-0 p-3 md:p-6 text-sm md:text-base flex items-center rounded hover:bg-yellow hover:scale-105 ease-out duration-200 text-white`}
                onClick={handleSearch}
                >
                Search
                </button>
                <button
                className={`bg-lightblue rounded h-8 w-15 md:h-12 md:ml-2 p-3 md:p-6 text-sm md:text-base flex items-center hover:bg-yellow hover:scale-105 ease-out duration-200 text-white`}
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


 
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import SortMenu from './SortingMenu';
import { useMediaQuery } from 'react-responsive';


const SearchBar = ({ onSearchResult, originalReports, onSortChange, sortError, hasSortError }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    // const [error, setError] = useState('');
    const [isScrolled, setIsScrolled] = useState(false); // tracks if the user has scrolled
    const [searchError, setSearchError] = useState(''); // Separate error state for search

    const handleSearch = async () => {
        try {
          // Check if the search term contains letters
          const hasLetters = searchTerm.match(/[a-zA-Z]/g);
      
          // Check if the search term contains digits
          const hasDigits = searchTerm.match(/\d/g);
      
          if (hasLetters && hasDigits) {
            // If the search term contains both letters and digits, show error
            onSearchResult(originalReports);
            setSearchError("Invalid search. Please try again.");
          } else if (hasLetters && hasLetters.length < 3) {
            // If the search term contains less than three letters, show error
            onSearchResult(originalReports);
            setSearchError("Incomplete search. Please try again.");
          } else {
            // If the search term has at least three letters or contains only digits, make the API call
            const response = await axios.get(`/missing/search/${searchTerm}`);
            onSearchResult(response.data);
      
            const searchParams = new URLSearchParams({ searchQuery: searchTerm });
            const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.replaceState(null, '', newUrl);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            if (!searchTerm.trim()) {
              setSearchError("Please enter a valid search term.");
            } else {
              setSearchError("Search is currently unavailable. Please try again later.");
            }
          } else {
            setSearchError("Error fetching missing persons data. Please try again later.");
          }
        }
      };
      


    // when the user clicks clear, nav to home route 
    // render originalReports (reports from initial api call)
    const handleClear = () => {
        setSearchTerm('');
        setSearchError("");
        navigate("/");
        onSearchResult(originalReports);
        onSortChange("");
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


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        handleSearch();
        }
    };

    useEffect(() => {
        // When the search term becomes empty, show the original reports again
        // empty searchbar means no search has been made or new search is desired
        if (searchTerm === '') {
        onSearchResult(originalReports);
        setSearchError('');
        }
    }, [searchTerm]);


    // clear the searchbar error if there is a sortingMenu error
    useEffect(() => {
      if (hasSortError) {
        setSearchError('');
      }
    }, [hasSortError]);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchTerm(params.get('searchQuery') || '');
    }, []);


    const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
    
      // Attach the scroll event listener on component mount
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

    
return (
  <div className={`flex flex-col p-2 md:p-4 ${isScrolled ? "bg-white bg-opacity-90 pb-6 md:pb-8" : "bg-white"}`}>
    <div className={`flex ${isMdScreenOrLarger ? "flex-row" : "flex-col"} w-full items-center font-main justify-between`}>
      <div className={`flex ${isMdScreenOrLarger ? "flex-row" : ""} w-full items-center`}>
        <input
          className={`w-3/6 text-xs md:text-md lg:text-base md:w-2/5 h-8 md:h-10 m-3 mb-0 p-1 md:p-3 border border-blue rounded ${isMdScreenOrLarger ? "" : ""}`}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for missing persons..."
        />
        <button
          className={`bg-lightblue h-8 mt-3 ml-0 p-3 md:p-6 flex items-center rounded hover:bg-yellow hover:scale-105 ease-out duration-200 text-white ${isMdScreenOrLarger ? "ml-2" : "text-sm"}`}
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className={`bg-lightblue rounded h-8 w-15 md:h-12 mt-3 ml-2 p-3 md:p-6 flex items-center hover:bg-yellow hover:scale-105 ease-out duration-200 text-white ${isMdScreenOrLarger ? "" : "text-sm"}`}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {searchError && !isMdScreenOrLarger && (
        <p className="w-full pl-3 text-red-500 text-xs italic items-start">{searchError}</p>
      )}
      <div className={`${isMdScreenOrLarger ? "w-3/5" : ""}`}>
        <SortMenu onSortChange={onSortChange} sortError={sortError}/>
      </div>
    </div>
      {searchError && isMdScreenOrLarger && (
        <p className="text-red-500 text-sm ml-3 italic">{searchError}</p>
      )}
  </div>
);
}

export default SearchBar;
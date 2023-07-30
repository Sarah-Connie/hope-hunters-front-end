import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import SortMenu from './SortingMenu';
import axios from '../api/axios';

const SearchBar = ({ onSearchResult, originalReports, onSortChange, sortError, hasSortError, setError }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [selectedOption, setSelectedOption] = useState("");


  const handleSearch = async () => {
    try {
      setSearchError("");

      if (searchTerm.trim() === "") {
        setSearchError("Please enter a valid search term.");
        return; // Return early if the search term is empty
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
      // wait to call api when the search query is valid
      else {
        const response = await axios.get(`/missing/search/${searchTerm}`);
        onSearchResult(response.data);

        const searchParams = new URLSearchParams({ searchQuery: searchTerm });
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
      }
    } catch (error) {
        if (error.response && error.response.status === 404) {
          setSearchError("Search is currently unavailable. Please try again later.");
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
      setSelectedOption("");
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

    // if user presses enter, proceed with the search
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
        // reset the selected option in the dropdown if applicable
        setSelectedOption("")
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
      <SortMenu
        onSortChange={(selectedValue) => {
          // update the selectedOption state when the value changes
          setSelectedOption(selectedValue);
          // run onSortChange (passed down) with the selected option from dropdown
          onSortChange(selectedValue);
        }}
        // passed down state var for reassigning the option on clear
        selectedOption={selectedOption}
        sortError={sortError}
      />
      </div>
    </div>
      {searchError && isMdScreenOrLarger && (
        <p className="text-red-500 text-sm ml-3 italic">{searchError}</p>
      )}
  </div>
);
}

export default SearchBar;
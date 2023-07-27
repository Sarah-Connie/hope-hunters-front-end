import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearchResult, originalReports }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');


//   const handleSearch = async () => {
//     try {
//       // Check if the search term has at least three letters (excluding spaces)
//       if (searchTerm.replace(/\s/g, '').length < 3) {
//         // If not, directly update the search results with the original reports
//         onSearchResult(originalReports);
//         setError("Incomplete search. Please try again.")
//         console.log("Unable to search. 3 letters required.");
//       } else {
//         // If the search term has at least three letters, make the API call
//         const response = await axios.get(`/missing/search/${searchTerm}`);
//         onSearchResult(response.data);
  
//         // Change URL to display search query based on params
//         const searchParams = new URLSearchParams({ searchQuery: searchTerm });
//         const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//         window.history.replaceState(null, '', newUrl);
//       }
//     } catch (error) {
//       console.error('Error searching for missing persons:', error);
//     }
//   };

    const handleSearch = async () => {
    try {
      // Check if the search term contains letters
      const hasLetters = searchTerm.match(/[a-zA-Z]/g);
  
      // Check if the search term contains digits
      const hasDigits = searchTerm.match(/\d/g);

      if (hasLetters && hasDigits) {
        // If the search term contains both letters and digits, show error
        onSearchResult(originalReports);
        setError("Invalid search. Please try again.");
      } else if (hasLetters && hasLetters.length < 3) {
        // If the search term contains less than three letters, show error
        onSearchResult(originalReports);
        setError("Incomplete search. Please try again.");
      } else {
        // If the search term has at least three letters or contains only digits, make the API call
        const response = await axios.get(`/missing/search/${searchTerm}`);
        onSearchResult(response.data);
  
        const searchParams = new URLSearchParams({ searchQuery: searchTerm });
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
      }
    } catch (error) {
      setError('Unable to process search. Please try again.')
      console.error('Error searching for missing persons:', error);
    }
  };
  
  

    // when the user clicks clear, nav to home route 
    // render originalReports (reports from initial api call)
    const handleClear = () => {
        setSearchTerm('');
        setError("");
        navigate("/");
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
        setError('');
        }
    }, [searchTerm]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchTerm(params.get('searchQuery') || '');
    }, []);


return (
    <div className="flex flex-col">
      <div className='flex w-full items-center font-main'>
        <input
          className='w-2/5 h-8 md:h-10 m-3 mb-0 p-1 md:p-3 border border-blue rounded'
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for missing persons..."
        />
        <button 
        //   className='bg-lightblue rounded h-8 md:h-12 mt-3 ml-0 p-3 md:p-6 flex items-center'
          className="bg-lightblue h-8 mt-3 ml-0 p-3 md:p-6 flex items-center rounded hover:bg-yellow hover:scale-105 ease-out duration-200 text-white"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
        //   className='bg-lightblue rounded h-8 w-15 md:h-12 mt-3 ml-2 p-3 md:p-6 flex items-center'
        className="bg-lightblue rounded h-8 w-15 md:h-12 mt-3 ml-2 p-3 md:p-6 flex items-center hover:bg-yellow hover:scale-105 ease-out duration-200 text-white"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm ml-3 italic">{error}</p>
      )}
    </div>
  );
}  

export default SearchBar;

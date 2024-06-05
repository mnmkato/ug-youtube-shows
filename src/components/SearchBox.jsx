import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchBox({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
        onSearch(text); 
    };

    return (
        <form action="" method="post" className='search-box'>
            <input 
                type="search" 
                name="search-text" 
                id="search-text" 
                placeholder='Search...'
                value={searchText}
                onChange={handleInputChange}
            />
            {searchText === '' && <SearchIcon className="searchbox-icon" />}
        </form>
    );
}

export default SearchBox;

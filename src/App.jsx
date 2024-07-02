import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import Playlist from './components/Playlist';
import Trendlist from './components/Trendlist';
import './App.css';
import RecentList from './components/RecentList';
import PopularList from './components/PopularList';

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setPlaylists(data);
                setFilteredPlaylists(data);
                setIsLoading(false); // Once data is fetched, set loading to false
            } catch (error) {
                console.error('There was a problem:', error);
                setIsLoading(false); // Set loading to false in case of error
            }
        };
        fetchPlaylists();
    }, []);

    const handleSearch = (text) => {
        if (text === '') {
            setIsSearching(false);
        } else {
            setIsSearching(true);
        }
        setSearchText(text);
        const filtered = playlists.filter((playlist) =>
            playlist.title.toLowerCase().includes(text.toLowerCase()) ||
            playlist.channelTitle.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPlaylists(filtered);
    };

    return (
        <div className="App">
            <div className="toolbar">
                <img src="/ugShows.svg" alt="logo"/>
                <h3>UG SHOWS</h3>
                <SearchBox onSearch={handleSearch} />
            </div>
            <div className="content">
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        {!isSearching && (
                            <div className="slider-content">
                                <Trendlist />
                                <div className="recentList">
                                    <h3>Recent</h3>
                                    <RecentList items={playlists.slice(0,9)} />
                                </div>
                            </div>
                        )}
                        <div>
                            {filteredPlaylists.length === playlists.length ? (
                                <p className="hero">
                                    UG Shows is a collection of {playlists.length} playlists of Ugandan shows on YouTube from various channels
                                </p>
                            ) : (
                                searchText !== "" && <p className="hero">{filteredPlaylists.length} results found for "{searchText}"</p>
                            )}
                        </div>
                        <Playlist playlists={filteredPlaylists} searchText={searchText} />
                    </>
                )}
            </div>
            {!isSearching && <div className="slider-content">
            <Trendlist />
            <div className="recentList">
                <h3>Recent</h3>
                <RecentList />
            </div>
            <div className="popularList">
                <h3>Popular</h3>
                <PopularList />
            </div>
              </div>}
              <div>
                {filteredPlaylists.length === playlists.length ? (
                  <p className="hero">
                    UG Shows is a collection of {playlists.length} playlists of Ugandan shows on YouTube from various channels
                  </p>
                ) : (
                  searchText !== "" && <p className="hero">{filteredPlaylists.length} results found for "{searchText}"</p>
                )}
            </div>
            <Playlist playlists={filteredPlaylists} />
          </div>
        </div>
    );
}

export default App;

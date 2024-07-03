import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import Playlist from './components/Playlist';
import Trendlist from './components/Trendlist';
import './App.css';
import ContentList from './components/ContentList';

function App() {
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;
    const [playlists, setPlaylists] = useState([]);
    const [playlistsTrending, setPlaylistsTrending] = useState([]);
    const [playlistsRecent, setPlaylistsRecent] = useState([]);
    const [playlistsPopular, setPlaylistsPopular] = useState([]);
    const [playlistsNew, setPlaylistsNew] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    playlistsResponse,
                    playlistsTrendingResponse,
                    playlistsRecentResponse,
                    playlistsPopularResponse,
                    playlistsNewResponse
                ] = await Promise.all([
                    fetch(apiUrl),
                    fetch(`${apiUrl}/trending`),
                    fetch(`${apiUrl}/recent`),
                    fetch(`${apiUrl}/popular`),
                    fetch(`${apiUrl}/new`)
                ]);
    
                if (!playlistsResponse.ok) {
                    throw new Error('Network response was not ok for playlists ' + playlistsResponse.statusText);
                }
    
                if (!playlistsTrendingResponse.ok) {
                    throw new Error('Network response was not ok for trending playlists ' + playlistsTrendingResponse.statusText);
                }
    
                if (!playlistsRecentResponse.ok) {
                    throw new Error('Network response was not ok for recent playlists ' + playlistsRecentResponse.statusText);
                }
    
                if (!playlistsPopularResponse.ok) {
                    throw new Error('Network response was not ok for popular playlists ' + playlistsPopularResponse.statusText);
                }
                
                if (!playlistsNewResponse.ok) {
                    throw new Error('Network response was not ok for new playlists ' + playlistsNewResponse.statusText);
                }
    
                const playlistsData = await playlistsResponse.json();
                const playlistsTrendingData = await playlistsTrendingResponse.json();
                const playlistsRecentData = await playlistsRecentResponse.json();
                const playlistsPopularData = await playlistsPopularResponse.json();
                const playlistsNewData = await playlistsNewResponse.json();
    
                setPlaylists(playlistsData);
                setFilteredPlaylists(playlistsData);
                setPlaylistsTrending(playlistsTrendingData);
                setPlaylistsRecent(playlistsRecentData);
                setPlaylistsPopular(playlistsPopularData);
                setPlaylistsNew(playlistsNewData); 
            } catch (error) {
                console.error('There was a problem fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading to false once both fetches are complete or in case of error
            }
        };
    
        fetchData();
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
                                <Trendlist playlists={playlistsTrending}/>
                                <div className="contentList">
                                    <h3>Recently Updated</h3>
                                    <ContentList playlists={playlistsRecent} />
                                </div>
                                <div className="contentList">
                                  <h3>Most Popular</h3>
                                  <ContentList playlists={playlistsPopular} />
                                </div>
                                <div className="contentList">
                                  <h3>Fresh Additions</h3>
                                  <ContentList playlists={playlistsNew} />
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
        </div>
    );
}

export default App;

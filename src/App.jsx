import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import Playlist from './components/Playlist';
import channels from './data'
import './App.css'

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    const data = await response.json();
                   setPlaylists(data)
                   setFilteredPlaylists(data);
            } catch (error) {
                console.error('There was a problem:', error);
            }
        };
        fetchPlaylists();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = playlists.filter((playlist) =>
            playlist.title.toLowerCase().includes(text.toLowerCase()) ||
            playlist.channelTitle.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPlaylists(filtered);
    };

    return (
        <div className="App">
            <div className="hero">
                <h1>UG SHOWS</h1>
                <p>A collection of {playlists.length} playlists of Ugandan shows on YouTube from {channels.length} channels</p>
                <SearchBox onSearch={handleSearch} />
                {filteredPlaylists.length === 0 && searchText !== "" && <p>No results found</p>}
            </div>
            <Playlist playlists={filteredPlaylists} />
        </div>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import Playlist from './components/Playlist';
import channels from './data'
import './App.css'

const apiKey = import.meta.env.VITE_YT_API_KEY;
const maxResults = 100;

function App() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const allPlaylists = await Promise.all(channels.map(async (channel) => {
                    const response = await fetch('https://ug-shows-backend-production.up.railway.app/api/playlists');
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    const data = await response.json();
                   setPlaylists(data)
                }));
            } catch (error) {
                console.error('There was a problem:', error);
            }
        };
        fetchPlaylists();
    }, []);

    return (
        <div className="App">
          <div className="hero">
            <h1>UG SHOWS</h1>
            <p>A collection of {playlists.length} playlists of Ugandan shows on YouTube from {channels.length} channels</p>
          </div>
          <Playlist playlists={playlists} />
        </div>
    );
}

export default App;

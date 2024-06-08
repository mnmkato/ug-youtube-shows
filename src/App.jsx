import React, { useState, useEffect, useRef } from 'react';
import SearchBox from './components/SearchBox';
import Playlist from './components/Playlist';
import channels from './data'
import Trendlist from './components/Trendlist';
import './App.css'

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    var trendSettings = {
        dots: true,
        arrows:false,
        infinite: true,
        autoplay:true,
        mobileFirst:true,
        centerMode: true,
        centerPadding: "20px",
        slidesToShow: 1,
        speed: 500,
      };

      const ref = useRef(null);
      var recentSettings = {
        infinite: false,
        dots: false,
        autoplay:true,
        arrows:true,
        speed: 1,
        autoplaySpeed: 1,
        slidesToShow: 4.5,
        slidesToScroll: 4,
        initialSlide:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3.5,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2.5,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 1.2,
              slidesToScroll: 1,
              arrows:false,
            }
          }
        ],
        afterChange: (currentSlide) => {
          if (currentSlide === 0) {
            ref.current.slickPause();
          }
        }
      };

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
      if (text=='') {
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
            {!isSearching && <div className="slider-content">
              <Trendlist trendlistItems={playlists.slice(0, 6)} settings={trendSettings}/>
            <div className="recentList">
                <h3>Recent</h3>
                <Trendlist trendlistItems={playlists.slice(10, 19)} settings={recentSettings} sliderRef={ref}/>
            </div>
              </div>}
            <p className="hero">UG Shows is a collection of {playlists.length} playlists of Ugandan shows on YouTube from {channels.length} channels</p>
            {filteredPlaylists.length === 0 && searchText !== "" && <p>No results found</p>}
            <Playlist playlists={filteredPlaylists} />
              </div>
        </div>
    );
}

export default App;

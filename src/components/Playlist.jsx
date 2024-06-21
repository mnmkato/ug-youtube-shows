import React, { useState, useEffect, useRef } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function Playlist({ playlists, searchText }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const playlistRef = useRef(null); // Ref to store reference to playlist div

    useEffect(() => {
        setCurrentPage(1);
    }, [playlists]);

    useEffect(() => {
         // Scroll to top of playlist component on currentPage change
    }, [currentPage]);
    const scrollToTop = () => {
        if (playlistRef.current) {
            let topOffset;
            if (searchText !== "") {
                topOffset = 0;
            } else {
                topOffset = playlistRef.current.offsetTop - 2 * 32;
            }
            console.log(searchText)
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); 
    };

    const totalPages = Math.ceil(playlists.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPlaylists = playlists.slice(startIndex, startIndex + itemsPerPage);

    return (
    <>
        <div ref={playlistRef} className="playlist">
           {currentPlaylists.map(playlist => (
               <a key={playlist.link} className="playlist_item" href={playlist.link} target="_blank" rel="noopener noreferrer">
                   <div className="image_wrapper">
                       <img src={playlist.thumbnail_high ? playlist.thumbnail_high : playlist.thumbnail_medium} alt={playlist.title} />
                   </div>
                   <div className='playlist_title'>{playlist.title}</div>
                   <div className='playlist_channel_title'>{playlist.channelTitle}</div>
               </a>
           ))}
           
        </div>
        <div className="controls">
            <label>
                Items per page: 
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </label>
            <span className="pagination-info">
                {startIndex + 1}-{Math.min(startIndex + itemsPerPage, playlists.length)} of {playlists.length}
            </span>
            <span className="pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    <NavigateBeforeIcon />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button  
                        key={index + 1} 
                        onClick={() => handlePageChange(index + 1)} 
                        className={currentPage === index + 1 ? 'page-button active' : 'page-button'}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    <NavigateNextIcon />
                </button>
            </span>
        </div>
    </>);
}

export default Playlist;

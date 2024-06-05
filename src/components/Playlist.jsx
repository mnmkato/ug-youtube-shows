import React from 'react';

function Playlist({ playlists }) {
    return (
        <div className="playlist">
            {playlists.map(playlist => (
                <a key={playlist.link} className="playlist_item" href={playlist.link} target="_blank" rel="noopener noreferrer">
                        <div className="image_wrapper">
                            <img src={playlist.thumbnail} alt={playlist.title} />
                        </div>
                        <div className='playlist_title'>{playlist.title}</div>
                        <div className='playlist_channel_title'>{playlist.channelTitle}</div>    
                </a>
            ))}
        </div>
    );
}

export default Playlist;

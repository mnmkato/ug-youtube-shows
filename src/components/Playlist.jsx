import React from 'react';

function Playlist({ playlists }) {
    return (
        <div className="playlist">
            {playlists.map(playlist => (
                <div key={playlist.link} className="playlist_item">
                    <a href={playlist.link} target="_blank" rel="noopener noreferrer">
                        <img src={playlist.thumbnail} alt={playlist.title} />
                        <h3>{playlist.title}</h3>
                        <p>{playlist.channelTitle}</p>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Playlist;

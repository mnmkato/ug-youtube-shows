import React, {useEffect,useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Trendlist({playlists}) {
    
    var settings = {
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

    return(
    <div className="slider-container">
    <Slider {...settings}>
    {playlists.map(item => (
            <a key={item.link} className="trendlist list_item" href={item.link} target="_blank" rel="noopener noreferrer">
                 <img src={item.thumbnail_maxres ? item.thumbnail_maxres : item.thumbnail_standard}alt={item.title} />
                <div className="list_caption">
                    <div className='list_title'>{item.title}</div>
                    <div className='list_channel_title'>{item.channelTitle}</div>
                </div>    
            </a>
        ))}
    </Slider>
    </div>)
}

export default Trendlist
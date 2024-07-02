import React, {useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PopularList() {
    const apiUrl = `${import.meta.env.VITE_API_URL}/popular`;
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    const data = await response.json();
                   setPlaylists(data)
            } catch (error) {
                console.error('There was a problem fetching popular playlists:', error);
            }
        };
        fetchPlaylists();
    }, []);

    const ref = useRef(null);

    var settings = {
      infinite: false,
      dots: false,
      autoplay:true,
      arrows:true,
      speed: 1,
      autoplaySpeed: 100,
      slidesToShow: 4.5,
      slidesToScroll: 4,
      initialSlide:0,
      responsive: [
        {
          breakpoint: 2561,
          settings: {
            slidesToShow: 3.5,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 1,
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
    return(
    <div className="slider-container">
    <Slider ref={ref} {...settings}>
    {playlists.map(item => (
            <a key={item.link} className="trendlist_item" href={item.link} target="_blank" rel="noopener noreferrer">
                 <img src={item.thumbnail_maxres ? item.thumbnail_maxres : item.thumbnail_high} alt={item.title} />
                <div className="trendlist_caption">
                    <div className='trendlist_title'>{item.title}</div>
                    <div className='trendlist_channel_title'>{item.channelTitle}</div>
                </div>    
            </a>
        ))}

    </Slider>
    </div>)
}

export default PopularList
import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ContentList({playlists}) {

    const ref = useRef(null);

    var settings = {
      infinite: true,
      dots: false,
      arrows: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      centerMode: true,
      responsive: [
        {
          breakpoint: 2561,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };
    
    return(
    <div className="slider-container">
    <Slider ref={ref} {...settings}>
    {playlists.map(item => (
            <a key={item.link} className="list_item" href={item.link} target="_blank" rel="noopener noreferrer">
                 <img src={
                          item.thumbnail_maxres 
                          ? item.thumbnail_maxres 
                          : item.thumbnail_standard 
                          ? item.thumbnail_standard 
                          : item.thumbnail_high 
                          ? item.thumbnail_high 
                          : item.thumbnail_medium 
                          ? item.thumbnail_medium 
                          : item.thumbnail_default
                      } alt={item.title} />
                <div className="list_caption">
                    <div className='list_title'>{item.title}</div>
                    <div className='list_channel_title'>{item.channelTitle}</div>
                </div>    
            </a>
        ))}

    </Slider>
    </div>)
}

export default ContentList
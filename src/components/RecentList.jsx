import React, {useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RecentList({items}) {
    
    const sliderRef  = useRef(null);

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
    <Slider ref={sliderRef } {...settings}>
    {items.map(item => (
            <a key={item.link} className="trendlist_item" href={item.link} target="_blank" rel="noopener noreferrer">
                 <img src={item.thumbnail_maxres ? item.thumbnail_maxres : item.thumbnail_standard} alt={item.title} />
                <div className="trendlist_caption">
                    <div className='trendlist_title'>{item.title}</div>
                    <div className='trendlist_channel_title'>{item.channelTitle}</div>
                </div>    
            </a>
        ))}

    </Slider>
    </div>)
}

export default RecentList
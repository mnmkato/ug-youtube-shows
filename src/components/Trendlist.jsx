import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Trendlist({trendlistItems, settings, sliderRef}) {
    
    return(
    <div className="slider-container">
    <Slider ref={sliderRef} {...settings}>
    {trendlistItems.map(item => (
            <a key={item.link} className="trendlist_item" href={item.link} target="_blank" rel="noopener noreferrer">
                 <img src={item.thumbnail} alt={item.title} />
                <div className="trendlist_caption">
                    <div className='trendlist_title'>{item.title}</div>
                    <div className='trendlist_channel_title'>{item.channelTitle}</div>
                </div>    
            </a>
        ))}

    </Slider>
    </div>)
}

export default Trendlist
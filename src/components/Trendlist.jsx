import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Trendlist({trendlistItems}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return(<>
    <Slider {...settings}>
    {trendlistItems.map(item => (
            <a key={item.link} className="playlist_item" href={item.link} target="_blank" rel="noopener noreferrer">
                <div className="image_wrapper">
                    <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className='playlist_title'>{item.title}</div>
                <div className='playlist_channel_title'>{item.channelTitle}</div>    
            </a>
        ))}

    </Slider>
    </>)
}

export default Trendlist
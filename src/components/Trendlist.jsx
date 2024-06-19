import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Trendlist({items}) {

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
    {items.map(item => (
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
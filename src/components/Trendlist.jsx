import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Trendlist() {
    const apiUrl = `${import.meta.env.VITE_API_URL}/trending`;
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
            <a key={item.link} className="trendlist_item" href={item.link} target="_blank" rel="noopener noreferrer">
                 <img src={item.thumbnail_maxres ? item.thumbnail_maxres : item.thumbnail_standard}alt={item.title} />
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
import AccomodationSearchBar from "../../components/accommodationSearchBar/AccomodationSearchBar";
import HotelCarousel from "../../components/hotelCarousel/HotelCarousel";
import './Home.css'

const Home = () => {
    return (
      <>
      <div className="home-body">
        <AccomodationSearchBar></AccomodationSearchBar>
      </div>
      <div>
        <HotelCarousel />
      </div>
      </>
    )
};

export default Home; 
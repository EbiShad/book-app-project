import { Link } from "react-router-dom";
import { useHotels } from "../Context/HotelProvider";



export default function Hotels() {

 const {isLoding , hotels , currentHotel} = useHotels()


  if (isLoding) return <div> loding.....</div>;

  return (
    <div className="searchList">
      <h2>
        Search {hotels.length} {hotels.length > 1 ? "Reasults" : "Reasult"}
      </h2>
      
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className= {`searchItem ${currentHotel?.id === item.id ? "current-hotel" : ""}`}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price"> $ {item.price}</p>
                <span>night</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}


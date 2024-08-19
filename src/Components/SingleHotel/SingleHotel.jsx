import { useParams } from "react-router-dom";

import { useHotels } from "../Context/HotelProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();

  const { getSingleHotel , currentHotel, isLodingcurrHotel } = useHotels()


useEffect(() => {
  getSingleHotel(id);
}, [id]);



  if (isLodingcurrHotel) return <p>loding....</p>;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div >{currentHotel.number_of_reviews} {" "} reviews {currentHotel.smart_location}</div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name}/>
      </div>
    </div>
  );
}

export default SingleHotel;

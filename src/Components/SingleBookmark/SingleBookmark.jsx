import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";


function SingleBookmark() {

    const { id } =useParams();

    const { getSingleBookmark  ,currentBookmark, isLoding } = useBookmark()
    
  
  useEffect(() => {
    getSingleBookmark(id);
  }, [id]);
  
  
  
  if(isLoding) return <p>lodinggggg....</p>;
  
  return (
    <div>
    <h2> {currentBookmark.cityName} </h2>

    {/* <p>{currentBookmark.cityName} {currentBookmark.country}</p> */}

    <div className="bookmarkItem">
              <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
              <strong>{currentBookmark.cityName}</strong>
              <p>{currentBookmark.country}</p>
            </div>
    </div>
  )
}

export default SingleBookmark
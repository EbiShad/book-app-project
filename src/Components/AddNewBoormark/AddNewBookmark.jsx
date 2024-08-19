import { SlArrowLeftCircle } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../Hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarkListContext";


const BACE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function AddNewBookmark() {

    const navigate = useNavigate()
    const [lat , lng]  = useUrlLocation()  
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [isLodingGeoCoding, setIsLodingGeoCoding] = useState(false);
    const [geoCodingError, setGeoCodingError] = useState(null);
    const {creatBookmark} = useBookmark()

    useEffect(()=>{
        if ( !lat || !lng) return;
        async function getLocation(){
        setIsLodingGeoCoding(true)
        setGeoCodingError(null)
        try {
        const {data} = await axios.get(`${BACE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)

        if(!data.countryCode) throw new Error("this city dose not exist. please chose another location")

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setCountryCode(data.countryCode)    

        } catch (error) {
            setGeoCodingError(error.message)
        }finally {setIsLodingGeoCoding(false)}
       }
       getLocation()
    },[lat,lng])


     const handleSubmit = async (e) => {
      e.preventDefault();
      if(!cityName || !country) return;

      const newBookmarks ={
        cityName:cityName,
        country:country,
        countryCode,
        latitude: lat,
        longitude:lng,
        host_location:cityName + " " + country ,
      }
      await creatBookmark(newBookmarks)
      navigate("/bookmark")
      };



    if (isLodingGeoCoding) return <p>loding....</p>
    if(geoCodingError) return <p>{geoCodingError}</p>
    

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">CityName </label>
          <input type="text" id="cityName" name="cityName" value={cityName} />
        </div>
        <div className="formControl">
          <label htmlFor="country">Contry </label>
          <input type="text" id="country" name="country" value={country} />
          <ReactCountryFlag  className="flag" svg countryCode={countryCode}/>
        </div>
        <div className="buttons">
          <button className="btn btn--back" onClick={(e) =>{
            e.preventDefault(),
             navigate(-1)
          }}>
            <SlArrowLeftCircle className="icon" /> Back{" "}
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;

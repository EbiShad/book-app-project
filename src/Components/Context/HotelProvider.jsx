import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext()
const Base_Url = " http://localhost:5000/hotels"

function HotelProvider({children}) {
 const [currentHotel , setCurrentHotel]= useState({})
 const [isLodingcurrHotel , setIsLodingcurrHotel]= useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoding, data:hotels } = useFetch( Base_Url ,`q=${destination || " "}&accommodates_gte=${room || 1}`);


  async function getSingleHotel(id){
    setIsLodingcurrHotel(true)
      try {
      const {data} =await axios.get(`${Base_Url}/${id}`);
      setCurrentHotel(data)
      setIsLodingcurrHotel(false)
      } catch (error) {
        toast.error(error.message)
        setIsLodingcurrHotel(false)
      }
  }



    
  return (
 <HotelContext.Provider value={{isLoding , hotels ,getSingleHotel ,currentHotel,isLodingcurrHotel }}>
    {children}
 </HotelContext.Provider>
  )
}


export function useHotels() {
    return useContext(HotelContext)
}



export default HotelProvider
import { useState } from "react"

export default  function useGeoLocation() {
    const  [isLoding, setIsLoding] = useState(false);
    const [position, setPosition] = useState({})
    const [error, setError] = useState(null)


function getPosition (){
    if(!navigator.geolocation) return setError(" your browser dose not support geo location");
    setIsLoding(true);
    navigator.geolocation.getCurrentPosition( (pos)=>{
        setPosition({
            lat:pos.coords.latitude,
            lng:pos.coords.longitude
        })
        setIsLoding(false)
    } , (error)=>{
        setError(error.message)
        setIsLoding(false)
    })
    }

    return{ isLoding ,position, error, getPosition}
}    




import useGeoLocation from "../../Hooks/useGeoLocation";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../Hooks/useUrlLocation";

function Map({markerLocation}) {
  // const { isLoding, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([40, 0]);


const [lat , lng]  = useUrlLocation()  
const { position:geoLocationPosition , getPosition,isLoding:isLodingPosition} = useGeoLocation();


useEffect( () =>{
if (geoLocationPosition?.lat && geoLocationPosition?.lng) setMapCenter( [geoLocationPosition.lat , geoLocationPosition.lng])
},[geoLocationPosition])

useEffect( () => {
  if( lat && lng) setMapCenter([lat,lng])
},[lat,lng])



  return (
    <div className="mapContainer">
      <MapContainer
        center={mapCenter}
        zoom={5}
        scrollWheelZoom={true}
        className="map"
      >
      <button className="getLocation" onClick={getPosition}>{ isLodingPosition ? "loding.....":"Use Your Location"}</button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick/>
        <ChangeCenter position={mapCenter}/>
        {markerLocation.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude , item.longitude]}>
              <Popup>
               {item.host_location}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;



function ChangeCenter ({position}){
 const map = useMap()
 map.setView(position)
 return null
}


function DetectClick(){
  const navigate = useNavigate()
 useMapEvent({
  click: (e) => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
 })
 return null
}

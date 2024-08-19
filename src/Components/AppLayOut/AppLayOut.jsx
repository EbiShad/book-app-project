import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../Context/HotelProvider";

function AppLayOut() {
  const { hotels } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar"><Outlet/> </div>
      <Map markerLocation={hotels}/>
    </div>
  );
}

export default AppLayOut;

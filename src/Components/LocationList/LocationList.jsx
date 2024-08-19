import useFetch from "../../Hooks/useFetch";

function LocationList() {
  const { data, isLoding } = useFetch("http://localhost:5000/hotels", "");

  if (isLoding) return <h3> Loding.....</h3>

  return (
    <div className="nearbyLocation">
      <h2>NearbyLocations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">${item.price} night</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;

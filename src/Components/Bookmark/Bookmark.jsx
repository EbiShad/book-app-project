import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarkListContext";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
 

function Bookmark() {
  const { isLoding, bookmarks, currentBookmark,DeleteBookmark} = useBookmark();


const handleDelete = async (e,id) =>{
  e.preventDefault();
  await DeleteBookmark(id)
}


  if (isLoding) return <div> loding......</div>;
  if(!bookmarks.length) return <h3>There is no bookmark</h3>

  return (
    <div className="bookmarkList">
      <h2>Bookmarks</h2>
      {bookmarks.map((item) => {
        return (
          <Link
            to={`${item.id}?lat=${item.latitude}&lnt=${item.longitude}`}
            key={item.id}
          >
            <div className={`bookmarkItem ${item.id === currentBookmark.id ? "current-bookmark" :""} `}>
              <ReactCountryFlag svg countryCode={item.countryCode} />
              <strong>{item.cityName}</strong>
              <p>{item.country}</p>
            <button onClick={(e) =>handleDelete(e,item.id)}> <FaTrashAlt  className="trash"/> </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Bookmark;

import axios from "axios";
import toast from "react-hot-toast";
import { createContext, useContext, useEffect, useReducer } from "react";


const Base_Url = "http://localhost:5000";
const BookmarkContext = createContext();

function BookmarkListProvider({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState({});
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoding, setIsLoding] = useState(false);


 const initiallState = {
  currentBookmark:{},
  bookmarks:[],
  isLoding:false,
  error:null
 }

 function bookmarkReducer(state,action){
 switch (action.type) {
  case "loding": return {
    ...state,
    isLoding:true
  };
  case "bookmarks/loaded": return {
    ...state,
    bookmarks:action.payload,
    isLoding:false
  };
  case "bookmark/loaded": return {
    ...state,
    currentBookmark:action.payload,
    isLoding:false
  };
  case "bookmark/created": return{
    ...state,
    bookmarks:[...state.bookmarks, action.payload],
    isLoding:false,
    currentBookmark:action.payload
  };
  case "bookmark/deleted": return{
    ...state,
    isLoding:false,
    bookmarks:state.bookmarks.filter( (item) => item.id !== action.payload),
    // currentBookmark:null
  };
  case "rejected": return {
    ...state,
    error:action.payload,
    isLoding:false
  };
  default: throw new Error("unkown action")  
    
}
}

 const [ {currentBookmark,bookmarks,isLoding} , dispatch] = useReducer(bookmarkReducer,initiallState )



  useEffect(() => {
    dispatch({type:"loding"})
    async function fetchBookmarkList(){
      try {
        const { data } = await axios.get(`${Base_Url}/bookmarks`);
        dispatch({type:"bookmarks/loaded" , payload:data})
      } catch (error) {
        toast.error(error.message)
        dispatch({type:"rejected", payload:"an error accored in loding bookmarks"})
      }
    }
    fetchBookmarkList()
  }, []);




  async function getSingleBookmark(id) {
    // if(Number(id) === currentBookmark?.id) return
    dispatch({type:"loding"})
    try {
    const { data } = await axios.get(`${Base_Url}/bookmarks/${id}`);
    dispatch({type:"bookmark/loaded", payload:data})
    } catch (error) {
      toast.error(error.message);
      dispatch({type:"rejected",payload:"an error accored in loding bookmark"})
    }
  }

  async function creatBookmark(newBookmarks) {
    dispatch({type:"loding"})
    try {
     const { data } = await axios.post(`${Base_Url}/bookmarks/`, newBookmarks);
     dispatch({type:"bookmark/created", payload:data})
    } catch (error) {
      toast.error(error.message);
      dispatch({type:"rejected", payload:"an error accured in create bookmarks"})
    }  
    }
  


  async function DeleteBookmark(id) {
    dispatch({type:"loding"})
    try {
      await axios.delete(`${Base_Url}/bookmarks/${id}`);
      dispatch({type:"bookmark/deleted", payload:id})
      // const { data } = await axios.get(`${Base_Url}/bookmarks`);
      // setBookmarks(data)
    } catch (error) {
      toast.error(error.message);
      dispatch({type:"rejected", payload:"an error accured in delete bookmarks"})
    } 
    }
  
  
  return (
    <BookmarkContext.Provider
      value={{
        isLoding,
        getSingleBookmark,
        currentBookmark,
        creatBookmark,
        bookmarks,
        DeleteBookmark
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
    }

  export  function useBookmark(){
    return (useContext(BookmarkContext));
  }
  



export default BookmarkListProvider;

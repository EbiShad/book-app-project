import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch ( url , query="") {

  const [data, setData] = useState([]);
  const [isLoding, setIsLoding] = useState(false);



    useEffect(() => {
        async function fetchData(){
        try {
          setIsLoding(true);
          const {data} = await axios.get(`${url}?${query}`);
          setData(data)
        } catch (err) {
        setData([])
          // console.log(err)
          // console.log(err.message)

        toast.error(err.message)
        //toast.error(err.response.data.error)
        } finally {setIsLoding(false)}
        }
    
    
        fetchData();
      }, [query,url]);







      return {isLoding , data}
}
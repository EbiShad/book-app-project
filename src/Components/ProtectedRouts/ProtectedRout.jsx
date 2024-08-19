import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuathProvider"
import { useEffect } from "react"


function ProtectedRout({chidren}) {

  const {isAuathenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() =>{
    if ( !isAuathenticated) navigate("/login")
  },[isAuathenticated, navigate])

  return  isAuathenticated ? chidren : null ;
}

export default ProtectedRout
import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuathProvider";
import { useNavigate } from "react-router-dom";



function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const {user, Login , isAuathenticated} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password) Login(email,password)
    }

    useEffect(()=>{
        if(isAuathenticated) navigate("/" , {replace:true})
    },[isAuathenticated])

  return (
    <div className="loginContainer">
    <h2>Login</h2>
    <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="email">email </label>
          <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="formControl">
          <label htmlFor="password">password </label>
          <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>

        <div className="buttons">
          <button className="btn btn--primary">login</button>
        </div>
      </form>
    </div>
  )
}

export default Login




import { createContext, useContext, useReducer } from "react"



const AuthContext = createContext();
const initialState ={
    user:null, 
    isAuathenticated:false
}


function AuthProvider({children}) {


   const FAKE_USER = {
        name:"ebi",
        email:"ebi@gmail.com",
        password:"123"
    }

   const [{user,isAuathenticated} , dispatch ] = useReducer(authReducer , initialState)

   function authReducer(state,action){
        switch (action.type) {
            case "login": return {
                user:action.payload,
                isAuathenticated:true
            };
            case "logout": return {
                user:null,
                isAuathenticated:false
            }
        }
   }


   function Login (email , password){
    if( email ===FAKE_USER.email && password === FAKE_USER.password){
        dispatch({type:"login" , payload:FAKE_USER})
    }
   }


   function Logout(){
        dispatch({type:"logout"})
   }
   

  return (
    <AuthContext.Provider value={{user, isAuathenticated, Logout, Login}}>
         {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    return useContext(AuthContext)
}



export default AuthProvider
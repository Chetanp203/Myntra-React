import { createContext ,useReducer} from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

const initialState = {user: null};

function reducer(state, action){
    switch(action.type){
        case "login":
            return{user: action.payload}
            case"logout":
            return{user: null}
            default:
                return state;
    }
}

const AuthProvider = ({children}) => {
     const [state, dispatch] = useReducer(reducer, initialState);

     const login = (userData) => {
        localStorage.setItem("Current-user", JSON.stringify(userData))
        dispatch({
            type: 'login',
            payload: userData
        })
    }
    const logout = () =>{
        localStorage.removeItem("Current-user")
        dispatch({type : 'logout'})
 
   }

   useEffect(()=> {
    const isUserPresent = JSON.parse(localStorage.getItem("Current-user"));
    if (isUserPresent){
        dispatch({
            type: 'login',
            payload: isUserPresent
        })
    }
},[])

   return (
    <AuthContext.Provider value={{state, login, logout}}>
        {children}

    </AuthContext.Provider>
   )
}
export default AuthProvider;
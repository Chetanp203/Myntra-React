import axios from "axios";
import { createContext ,useReducer} from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

const initialState = {user: null};

function reducer(state, action){
    switch(action.type){
        case "login":
            return{...state,user: action.payload}
            case"logout":
            return{...state,user: null}
            default:
                return state;
    }
}

const AuthProvider = ({children}) => {
     const [state, dispatch] = useReducer(reducer, initialState);

    // useEffect(()=>{
    //   async  function getCurrentUserData(){
    //       let token = JSON.parse(localStorage.getItem("token"));
    //       const response = await axios.post("http://localhost:8002/get-current-user",{token});
    //       if(response.data.success){
    //         dispatch({
    //             type: "login",
    //             payload: response.data.user
    //         })
    //       }else{
    //         dispatch({
    //             type:"logout",
    //         });
    //       }
    //     }
    //     getCurrentUserData();
    // },[])
   return (
    <AuthContext.Provider value={{state, dispatch}}>
        {children}

    </AuthContext.Provider>
   )
}
export default AuthProvider;
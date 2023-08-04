import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Auth.Context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { state, login ,logout} = useContext(AuthContext);
    console.log(state,"-state")
    const [userData, setUserData] = useState({name:"", email:"",password:"", role:"Buyer",cart:[]});
    const router = useNavigate();
    console.log(userData,"-userdata");
    const [user, setUser] = useState();
  
    useEffect(()=> {
       if(state?.user){
        setUser(state?.user)
       }else{
        setUser({});
       }
    },[state])
  
    const handleChange= (event) => {
       setUserData({...userData, [event.target.name] : event.target.value})
    }
  
    const handleloginSubmit = (event) => {
      event.preventDefault();
      if (userData.email && userData.password) {
          const users = JSON.parse(localStorage.getItem("Users")); // accessed localstorage
          console.log(users,"-users")
          var flag = false;
          for (var i = 0; i < users.length; i++) {
              if (users[i].email == userData.email && users[i].password == userData.password) {
                  flag = true; // re-assign
                  login(users[i]);
  
                  alert("Login successfull.");
                  setUserData({ email: "", password: "" })
                  router('/');
                  break;
              }
          }
  
          if (flag == false) {
              return alert("Please check credentails.")
          }
  
      } else {
          alert("All fields are mandatory")
      }
  }
  
  
  return (
    <div style={{width:'100%',backgroundColor:'rgb(253,239,234)',height:'600px',padding:'30px'}}>
        <div style={{width:'450px',margin:'auto',backgroundColor:'white'}}>
            <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2023/2/7/9d70554f-0a7d-49f1-a063-4c32800a9bfd1675792560640-offer-banner-400-600x240-code-_-MYNTRA300.jpg" style={{width:'100%'}} />
            
                <h4 style={{padding:'30px'}}><b>Login</b></h4>
                
            <form style={{textAlign:'center'}} onSubmit={handleloginSubmit}>
            <label>Email:</label><br />
            <input type="text" onChange={handleChange} name='email' placeholder='Email Id'style={{width:'80%'}} /><br />
            <label>Password:</label><br />
            <input type="password" onChange={handleChange} name='password' placeholder='Password' style={{width:'80%'}}/>
            <p style={{padding:'10px 30px'}}>By continuing ,I agree to the Terms of Use & Privacy Policy</p>
            <input type="submit" value="Login" style={{width:'80%',backgroundColor:'rgb(255,63,108)',border:'none',color:'white',height:'40px',margin:'5px 30px'}} />
            </form>

            <span style={{paddingLeft:'90px'}}>Dont have an account?<span onClick={()=> router("/register")}><b>Register here!!</b></span> </span>

        </div>

    </div>
  )
}

export default Login
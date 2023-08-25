import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Auth.Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Register = () => {
//     const { state, login ,logout} = useContext(AuthContext);
//     console.log(state,"-state")
//     const [userData, setUserData] = useState({name:"", email:"",password:"", role:"Buyer",cart:[]});
//     const router = useNavigate();
//     console.log(userData,"-userdata");
//     const [user, setUser] = useState();
  
//     useEffect(()=> {
//        if(state?.user){
//         setUser(state?.user)
//        }else{
//         setUser({});
//        }
//     },[state])
  
//     const handleChange= (event) => {
//        setUserData({...userData, [event.target.name] : event.target.value})
//     }
//     const handleSelectChange= (event) => {
//       const value = event.target.value
//       setUserData({...userData,["role"]:value})
//    }
  
//   //  role: event.target.value
  
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if(userData.name && userData.email && userData.password){
//             const array = JSON.parse(localStorage.getItem("Users")) || [];
  
//             const userDataObj = {
//                 name: userData.name,
//                 email: userData.email,
//                 password: userData.password,
//                 cart:[],
//                 role: userData.role,
//             };
//             array.push(userDataObj);
//             localStorage.setItem("Users", JSON.stringify(array));
//             alert("Registration Successfull!!!")
//             setUserData({name:"", email:"",password:""})
//             // router('/login')
//         } else {
//             alert("All fields mandatory")
//         }
//     }
  
//     const handleloginSubmit = (event) => {
//       event.preventDefault();
//       if (userData.email && userData.password) {
//           const users = JSON.parse(localStorage.getItem("Users")); // accessed localstorage
//           console.log(users,"-users")
//           var flag = false;
//           for (var i = 0; i < users.length; i++) {
//               if (users[i].email == userData.email && users[i].password == userData.password) {
//                   flag = true; // re-assign
//                   login(users[i]);
  
//                   alert("Login successfull.");
//                   setUserData({ email: "", password: "" })
//                   router('/');
//                   break;
//               }
//           }
  
//           if (flag == false) {
//               return alert("Please check credentails.")
//           }
  
//       } else {
//           alert("All fields are mandatory")
//       }
//   }
  
const [userData,setUserData]= useState({name:"", email:"", password:"",confirmPassword:"",role:"Buyer"})
const {state,dispatch} = useContext(AuthContext);
const router = useNavigate();

const handleChange = (event)=>{
    setUserData({...userData,[event.target.name]:event.target.value})
}

const handleSelectChange =(event)=>{
    setUserData({...userData,"role": event.target.value})
}

// console.log(userData,"-userdata")

const handleSubmit =async (event)=>{
    event.preventDefault();
    if(userData.name && userData.email && userData.password && userData.confirmPassword && userData.role){
       if (userData.password === userData.confirmPassword){
          const response = await axios.post("http://localhost:8002/register",{userData});
          if(response.data.success){
            router("/login")
            toast.success(response.data.message)
          }else{
            toast.error(response.data.message)
          }
       }else{
        toast.error("Passwords didn't match..")
       }
    }else{
        toast.error("All fields are mandatory")
    }
}

useEffect(()=>{
  if(state?.user?.name){
    router("/")
  }
  },[state])
  return (
    <div style={{width:'100%',backgroundColor:'rgb(253,239,234)',height:'750px',padding:'30px'}}>
        <div style={{width:'550px',margin:'auto',backgroundColor:'white'}}>
            <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2023/2/7/9d70554f-0a7d-49f1-a063-4c32800a9bfd1675792560640-offer-banner-400-600x240-code-_-MYNTRA300.jpg" style={{width:'100%'}} />
            
                <h4 style={{padding:'30px'}}><b>Signup</b></h4>
           
            <form style={{textAlign:'center'}} onSubmit={handleSubmit}>
            <label>Name:</label><br />
            <input type="text" onChange={handleChange} name='name' placeholder='Username'style={{width:'80%'}} value={userData.name}/><br />
            <label>Email:</label><br />
            <input type="text" onChange={handleChange} name='email' placeholder='Email Id'style={{width:'80%'}} value={userData.email}/><br />
            <select onChange={handleSelectChange} style={{ width: '80%', height: '40px',border:'1px solid #ccc',marginTop:'5px' }}>
                      <option value="Buyer">Buyer</option>
                      <option value="Seller">Seller</option>
                    </select><br />
            <label>Password:</label><br />
            <input type="password" onChange={handleChange} name='password' placeholder='Password' style={{width:'80%'}} value={userData.password}/>
            <label>Confirm Password:</label><br />
            <input type="password" onChange={handleChange} name='confirmPassword' placeholder='Password' style={{width:'80%'}} value={userData.confirmPassword}/>

            <p style={{padding:'0px 30px'}}>By continuing ,I agree to the Terms of Use & Privacy Policy</p>
            <input type="submit" value="Register" style={{width:'80%',backgroundColor:'rgb(255,63,108)',border:'none',color:'white',height:'40px',margin:'5px 30px'}} />
            </form>

            <span style={{paddingLeft:'90px'}}>Already have an account?<span onClick={()=> router("/login")}><b>Login here!!</b></span> </span>

        </div>

    </div>
  )
}

export default Register
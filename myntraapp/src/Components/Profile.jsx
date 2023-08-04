import React, { useContext } from 'react'
import './Profile.css'
import { AuthContext } from '../Context/Auth.Context';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {state, login } = useContext(AuthContext)

    const [userData, setUserData] = useState({});
    const router = useNavigate();
    


    useEffect(() => {
        const currentuser = JSON.parse(localStorage.getItem("Current-user"));
        if (!currentuser) {
            router("/login")
        }
        const allUsers = JSON.parse(localStorage.getItem("Users"));
        if (currentuser && allUsers) {
            for (var i = 0; i < allUsers.length; i++) {
                if (allUsers[i].email == currentuser.email && allUsers[i].password == currentuser.password) {
                    setUserData(allUsers[i])
                }
            }
        }
    }, [state])

    function handleChange(event) {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const currentuser = JSON.parse(localStorage.getItem("Current-user"));
        const allUsers = JSON.parse(localStorage.getItem("Users"));
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email == currentuser.email && allUsers[i].password == currentuser.password) {
                allUsers[i].name = userData.name;
                allUsers[i].password = userData.password;
                allUsers[i].email = userData.email;
                currentuser.password = userData.password;
                currentuser.name = userData.name;
                currentuser.email = userData.email;
            }
        }
        login(currentuser)
        localStorage.setItem("Current-user", JSON.stringify(currentuser));
        localStorage.setItem("Users", JSON.stringify(allUsers));
        setUserData({});
        alert("Profile Updated");
    }
    return (
        <div className='container2'>
            <div className="left1">
                <div>
                    <h3>Menu</h3>
                </div>
                <div className="cat1">
                    <i className="fa-regular fa-heart" style={{ color: '#050505' }}></i>
                    <p>My Wishlist</p>
                </div>
                <div className="cat1">
                    <i className="fa-solid fa-suitcase-rolling" style={{ color: '#0a0a0a' }}></i>
                    <p>Order History</p>
                </div>
                <div className="cat1">
                    <i className="fa-solid fa-n" style={{ color: '#050505' }}></i>
                    <p>MynCash</p>
                </div>
                <div className="cat1">
                    <i className="fa-regular fa-address-book" style={{ color: '#050505' }}></i>
                    <p>Address Book</p>
                </div>
                <div className="cat1">
                    <i className="fa-solid fa-tag" style={{ color: '#121212' }}></i>
                    <p>Brands</p>
                </div>
                <div className="cat1">
                    <i className="fa-regular fa-credit-card" style={{ color: '#0c0d0d' }}></i>
                    <p>Saved Payments</p>
                </div>
                <div className="cat1">
                    <i className="fa-regular fa-bell" style={{ color: '#050505' }}></i>
                    <p>Alert & Coupons</p>
                </div>
                <div className="cat1">
                    <i className="fa-brands fa-cc-amex" style={{ color: '#030303' }}></i>
                    <p>Gift Card</p>
                </div>
                <div className="cat1">
                    <i className="fa-solid fa-indian-rupee-sign" style={{ color: '#080808' }}></i>
                    <p>CliQ Cash</p>
                </div>
                <div className="cat1">
                    <i className="fa-regular fa-address-book" style={{ color: '#050505' }}></i>
                    <p>Manage Notifications</p>
                </div>
                <div className="cat1">
                    <i className="fa-solid fa-gear" style={{ color: '#f80d72' }}></i>
                    <p className='pink'> Profile</p>
                </div>


            </div>




            <div className="mid1">
                <div>
                    <h3>General Information</h3>
                </div>
                <br />
                <div>
                    <h4>Basic Details</h4>
                </div>
                <br />
               <form onSubmit={handleSubmit}>
               <div className="details">
                    <div className='flex space'>
                        <p> Name</p>
                        <input type="text" value={userData.name} name="name" onChange={handleChange} />
                    </div>
                   
                </div>
                <br />
                
                <br />
                <div className="details">
                    <div className='flex space'>
                        <p>Email:</p>
                        <input type="email"  value={userData.email} name="email" onChange={handleChange}/>
                    </div>
                    
                </div>
                <br />
                
                <br />
                <div className="details">
                    <div className='flex space'>
                        <p>Password: </p>
                        <input type="password" value={userData.password} name="password" onChange={handleChange}/>
                    </div>

                </div>
                <br />
                
                <br />
                <div className="details">
                    <div className='flex space'>
                        <p>Address: </p>
                        <input type="text" placeholder='203/Sweet Home Chs, sector:12,Panvel' />
                    </div>

                </div>
                <br />
                
                <br />
                <div className="details">
                    <div className='flex space'>
                        <p>Gender: </p>
                        <input type="text" placeholder='Male' />
                    </div>

                </div>
                <br />
                
                <br />
                <div className="details">
                    <div className='flex space'>
                        <p>Alternate Mobile : </p>
                        <input type="text" placeholder='7021509346' />
                    </div>

                </div>

                <input className='update-profile' type="submit" />
               </form>

            </div>




            {/* <div className="right2">
                <button style={{ marginLeft: 65 }}>{userData?.name}</button>
                <p>{userData.email}</p>
            </div> */}

        </div>
    )
}

export default Profile;
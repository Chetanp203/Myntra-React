import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { AuthContext } from '../Context/Auth.Context';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

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




    return (
        <div>
            <div className="containerHeader header">
                <div className="flex space-between nav">
                    <div className="left flex items-center ">
                        <img onClick={()=> router("/")} src="https://gumlet.assettype.com/afaqs%2F2021-01%2F15f5f827-8e29-4520-af8d-a0f353b8da17%2Fimages.png?auto=format%2Ccompress&w=1200" />
                        <ul className="flex items-center justify-center uppercase semibold">
                            <li onClick={()=> router("/allproducts")}>Men</li>
                            <li onClick={()=> router("/allproducts")}>Women</li>
                            <li onClick={()=> router("/allproducts")}>Kids</li>
                            <li onClick={()=> router("/allproducts")}>Home and Living</li>
                            <li onClick={()=> router("/allproducts")}>Beauty</li>
                            <li onClick={()=> router("/allproducts")}>Studio</li>
                        </ul>
                    </div>
                    <div className="right flex items-center">
                        <input className="search desktop-searchBar" placeholder="Search for products, brands and more" />
                        <div className="rightBox">
                            <div className="profile mx-2   dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-regular fa-user" style={{color: '#080808'}}></i>
                                    <h6> Profile</h6>

                                {/* <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        D
                                    </button> */}
                                    <ul class="dropdown-menu" style={{width:'250px',padding:'20px',lineHeight:'15px'}}>
                                        <li onClick={()=> router("/profile")}><a class="dropdown-item" href="#"><b>Hello -{user?.name}</b></a></li>
                                        <li><a class="dropdown-item" href="#">9004003518</a></li>
                                        <li onClick={()=> router("/login")}><a class="dropdown-item" href="#">Login</a></li>
                                        {state?.user?.role == "Seller" && <li onClick={()=>router("/add-products")}><a class="dropdown-item" href="#">+ Add Products</a></li>}
                                        <hr />
                                        <li><a class="dropdown-item" href="#">Orders</a></li>
                                        <li><a class="dropdown-item" href="#">Wishlist</a></li>
                                        <li><a class="dropdown-item" href="#">Gift Cards</a></li>
                                        <li><a class="dropdown-item" href="#">Contact us</a></li>
                                        <li><a class="dropdown-item" href="#">Myntra Insider</a></li>
                                        <hr />
                                        <li><a class="dropdown-item" href="#">Myntra Credit</a></li>
                                        <li><a class="dropdown-item" href="#">Coupons</a></li>
                                        <li><a class="dropdown-item" href="#">Saved Cards</a></li>
                                        <li><a class="dropdown-item" href="#">Saved VPA</a></li>
                                        <li><a class="dropdown-item" href="#">Saved Addresses</a></li>
                                        <hr />
                                        <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                                        <li><a class="dropdown-item" href="#" onClick={logout} onClick={()=> router("/")}>Logout</a></li>
                                    </ul>
                                {/* </div> */}
                            </div>
                            <div className="wishlist mx-2">
                                <i className="fa-regular fa-heart" style={{ color: '#000000' }}></i>
                                <h6>WishList</h6>
                            </div>
                            <div className="bag mx-2">
                                <i className="fa-solid fa-bag-shopping" style={{ color: '#000000' }}></i>
                                <h6 onClick={()=> router("/bag")}>Bag</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import "./Bag.css"
import { useContext } from 'react';
import { AuthContext } from '../Context/Auth.Context';
import { Router, useNavigate } from 'react-router-dom';

const Bag = () => {
  const [cartProd, setCartProd] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { state } = useContext(AuthContext);
  const route = useNavigate();

  // console.log(state);

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("Current-user"));

    if (state?.user?.role === "Seller") {
      route("/");
      // alert("You are not a buyer")
    }
  }, []);

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("Current-user"));
    if (!currentuser) {
      alert("Login to view cart")
      route("/login")
    }
  }, [])


  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("Current-user"));
    const regusers = JSON.parse(localStorage.getItem("Users"));

    if (state?.user && state?.user?.role === "Buyer") {
      for (let i = 0; i < regusers.length; i++) {
        if (regusers[i].email === currentuser.email) {
          setCartProd(regusers[i].cart);
        }
      }
    }
  }, [state]);

  useEffect(() => {
    if (cartProd.length) {
    }
    let sum = 0;
    for (let i = 0; i < cartProd.length; i++) {
      sum += parseInt(cartProd[i].price);
      // console.log(sum);
    }
    setTotalPrice(sum);
  }, [cartProd]);

  const removeSingleProduct = (id) => {
    const currentuser = JSON.parse(localStorage.getItem("Current-user"));
    const regusers = JSON.parse(localStorage.getItem("Users"));
    const filterItem = cartProd.filter((item) => item.id != id);

    if (state?.user && state?.user?.role === "Buyer") {
      for (let i = 0; i < regusers.length; i++) {
        if (regusers[i].email === currentuser.email) {
          regusers[i].cart = filterItem;
          localStorage.setItem("Users", JSON.stringify(regusers));
          setCartProd(filterItem);
          // setTotalPrice(0);
          alert("Product removed");
        }
      }
    }
  };

  const checkOut = () => {
    const currentuser = JSON.parse(localStorage.getItem("Current-user"));
    const regusers = JSON.parse(localStorage.getItem("Users"));

    if (state?.user && state?.user?.role === "Buyer") {
      for (let i = 0; i < regusers.length; i++) {
        if (regusers[i].email === currentuser.email) {
          regusers[i].cart = [];
          localStorage.setItem("Users", JSON.stringify(regusers));
          setCartProd([]);
          setTotalPrice(0);
          alert("Product will Deliver Soon");
        }
      }
    }
  };

  return (
    <div className='b-container'>

      <div className="flex space" style={{ padding: 20, alignItems: 'center', backgroundColor: 'rgb(249,249,249)' }}>
        <p style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 40 }}>My Bag</p>
        <div className='flex space' style={{ width: 240 }}>
          <p><b>Delhi, 110001</b></p>
          <p>Change PIN code</p>

        </div>
      </div>

      <div className="b-con2">
        <p style={{ fontSize: 14, paddingLeft: 65, paddingTop: 20 }}>Apply a relevant <b>coupon code</b> here to avail any additional discount. Applicable <b>cashback </b> if any will be credited to your account as per T&C.</p>


        <div className="flex">
          <div className="left-con">
            <div className='cong'>
              <p className="green">Congratulations NeuPass User!! Your order is eligible for <b>Free Shipping!</b></p>
            </div>
            {cartProd.map((pro) => (
              <div className="flex save-wish" style={{ fontSize: 14, lineHeight: 2 }} key={pro.id}>
                <img src={pro.image} className='bag-pro' />

                <div style={{ padding: 10 }}>

                  <div className='flex'>
                    <p>{pro.title}</p>
                    <img src="https://www.tatacliq.com/src/general/components/img/deliveryIcon.svg" className='del-icon' />
                    <p>Delivery by <b>15th Jul</b> <span className='green' ><b >FREE</b></span></p>
                  </div>
                  <span><b>₹{pro.price}</b><del>₹{pro.price}</del><span className='green'><b>₹1260.00 Off</b></span>

                  </span>
                  <p>Color:Ivory</p>
                  <br />
                  <br />
                  <hr />
                  <div className="flex space" style={{ padding: 15 }}>
                    <p>Quantity:1</p>
                    <div className="flex space ">
                      <p style={{ paddingRight: 30 }} >Save to wishlist</p>
                      <p onClick={() => removeSingleProduct(pro.id)}>Remove </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}



            <button onClick={() => route("/")}>Continue Shopping</button>



          </div>
          <div className="right-con">
            <div className="coupons">
              <img src="https://www.tatacliq.com/src/general/components/img/coupon.png" style={{ width: 30, paddingRight: 10 }} />
              <p><b>Check for Coupons</b></p>
            </div>

            <div className='check'>
              <div className='check2'>
                <div className='space flex'>
                  <p>Bag Total</p>
                  <p>₹{totalPrice}</p>
                </div>
                <div className='space flex'>
                  <p>Shipping Charge</p>
                  <p className='green'><b>FREE</b></p>
                </div>
                <div className='space flex'>
                  <p>Bag Subtotal</p>
                  <p>₹{totalPrice}</p>
                </div>
                <div className='space flex'>
                  <p>Product Discount(s)</p>
                  <p>-₹1260.00</p>
                </div>
                <p className='green'>You will save ₹1260.00 on this order</p>

              </div>
              <hr />
              <div className="check3 flex space">
                <div>
                  <p><b>Total</b></p>
                  <p><b>₹{totalPrice}</b></p>
                </div>
                <button onClick={checkOut}>Checkout</button>
              </div>
            </div>

            <div style={{ padding: 30 }}>
              <p>Safe and secure payments . Easy returns </p>
              <p>100% Authentic Products</p>
            </div>



          </div>
        </div>
      </div>
    </div>



  )
}

export default Bag;
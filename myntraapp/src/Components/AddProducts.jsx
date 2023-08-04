import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../Context/Auth.Context';

const AddProducts = () => {

  const [prodDetails, setProdDetails] = useState({ title: "", price: "", image: "", category: "Others" });
  const router = useNavigate();
  const { state } = useContext(AuthContext);

  const HandleProdDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProdDetails({ ...prodDetails, [name]: value });
  };
  const HandleCategory = (e) => {
    const value = e.target.value;
    setProdDetails({ ...prodDetails, ["category"]: value });
  };

  const { image, title, price, category } = prodDetails;

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (image && title && price && category) {
      const getProduct = JSON.parse(localStorage.getItem("Products")) || [];

      const prodObj = {
        ...prodDetails,
        id: uuidv4(),
      };

      getProduct.push(prodObj);
      localStorage.setItem("Products", JSON.stringify(getProduct));
      alert("product added successfully");
      setProdDetails({
        image: "",
        title: "",
        price: "",
        category: "Other",
      });
    } else {
      alert("please fill all the fields");
      setProdDetails({
        image: "",
        title: "",
        price: "",
        category: "Other",
      });
    }
  };

  useEffect(() => {
    // let currentuser = JSON.parse(localStorage.getItem("currentuser"));
    if (state?.user) {
      if (state?.user?.role == "Buyer") {
        alert("sorry You are not a seller");
        router("/");
      }
    } else {
      router("/login");
      alert("Login First as a seller");
    }
  }, []);

  
  return (
    <div>
      <h1>AddProducts</h1>
      <form onSubmit={handleProductSubmit} style={{ border: '1px solid black', fontSize: '30px', padding: '50px', margin: 'auto', border: '1px solid #ccc', width: '30%' }}>
        <label >Product Name:</label><br />
        <input value={prodDetails.title} type="text" name='title' onChange={HandleProdDetails} style={{ width: '250px', height: '40px', border: '1px solid #ccc' }} /><br />
        <label>Product Category:</label><br />
        <select onChange={HandleCategory} style={{ width: '250px', height: '40px', border: '1px solid #ccc' }}>
          <option value="Others">Others</option>
          <option value="Mens">Mens</option>
          <option value="Womens">Womens</option>
          <option value="Kids">Kids</option>
          <option value="Furniture">Furniture</option>
          <option value="Beauty">eauty</option>
          <option value="Electronics">Electronics</option>
        </select>
        <br />

        <label >Product Price:</label><br />
        <input value={prodDetails.price} type="number" name='price' onChange={HandleProdDetails} style={{ width: '250px', height: '40px', border: '1px solid #ccc' }} /><br />
        <label >Product Image: </label><br />
        <input value={prodDetails.image} type="text" name='image' onChange={HandleProdDetails} style={{ width: '250px', height: '40px', border: '1px solid #ccc' }} /><br />
        <input type="submit" value="Add Product" style={{ width: '250px', height: '40px', backgroundColor: 'purple', border: 'none', borderRadius: '5px', color: 'white', marginTop: '20px', border: '1px solid #ccc' }} /><br />

      </form>
    </div>
  )
}

export default AddProducts;
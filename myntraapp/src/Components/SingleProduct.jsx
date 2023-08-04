import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth.Context";
import "./SingleProduct.css"

const SingleProduct = () => {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState({});
    const [updateProdContainer, setUpdateProdContainer] = useState(false);

    const { state } = useContext(AuthContext);
    const route = useNavigate();

    // console.log(singleProduct);

    useEffect(() => {
        const getProduct = JSON.parse(localStorage.getItem("Products"));

        if (getProduct) {
            let prodId = getProduct.find((item) => item.id === id);
            setSingleProduct(prodId);
        }
    }, []);

    const addToCart = (id) => {
        const regUser = JSON.parse(localStorage.getItem("Users"));

        if (state?.user) {
            for (let i = 0; i < regUser.length; i++) {
                if (regUser[i].email === state.user.email) {
                    const duplicate = regUser[i].cart.find((e) => e.id === id);

                    // console.log(duplicate);
                    // Do not add Duplicate items
                    if (regUser[i].cart.length && duplicate) {
                        alert("product already added");
                        route("/bag");
                    } else {
                        regUser[i].cart.push(singleProduct);
                        localStorage.setItem("Users", JSON.stringify(regUser));
                        alert("product added");
                        route("/allproducts");
                    }
                }
            }
        }
    };

    const updateProductDetails = () => {
        setUpdateProdContainer(true);
    };

    const closeUpdateProdContainer = () => {
        setUpdateProdContainer(false);
    };

    function changeProdDetails(e) {
        const name = e.target.name;
        const value = e.target.value;

        setSingleProduct({ ...singleProduct, [name]: value });
    }

    const changeProdDetailsCategory = (e) => {
        const value = e.target.value;
        setSingleProduct({ ...singleProduct, ["category"]: value });
    };

    function handleSubmitProductUpdate(e) {
        e.preventDefault();

        const getProduct = JSON.parse(localStorage.getItem("Products"));
        //eslint
        for (let i = 0; i < getProduct.length; i++) {
            if (getProduct[i].id === id) {
                getProduct[i].image = singleProduct.image;
                getProduct[i].title = singleProduct.title;
                getProduct[i].price = singleProduct.price;
                getProduct[i].category = singleProduct.category;

                localStorage.setItem("products", JSON.stringify(getProduct));
                alert("updated success");
                setUpdateProdContainer(false);
            }
        }
    }

    return (
        <div>

            <div style={{ display: "flex", marginTop: "2%" }}>
                <div style={{ width: "60%" }}>
                    <div style={{ width: "100%", margin: "auto",display:'flex',flexWrap:'wrap',justifyContent:'space-around' }}>
                        <img width="47%" src={singleProduct.image} style={{borderRadius:'10px',margin:'5px'}} />
                        <img width="47%" src={singleProduct.image} style={{borderRadius:'10px',margin:'5px'}} />
                        <img width="47%" src={singleProduct.image} style={{borderRadius:'10px',margin:'5px'}} />
                        <img width="47%" src={singleProduct.image} style={{borderRadius:'10px',margin:'5px'}} />
                        <img width="47%" src={singleProduct.image} style={{borderRadius:'10px',margin:'5px'}} />
                        <img width="47%" src={singleProduct.image} style={{borderRadius:'10px',margin:'5px'}} />
                    </div>
                </div>

                <div style={{ width: "35%",borderLeft:'1px solid #ccc' ,padding:'30px'}}>
                    <p style={{fontSize:'25px',fontWeight:'bolder',fontFamily:'arial'}}>{singleProduct.title}</p>
                    <br />
                    <hr />
                    <p >{singleProduct.description}</p>
                    <br />
                    <h1 style={{fontSize:'25px'}}><b>Rs.{singleProduct.price}</b></h1>
                    <p><strike>Rs {singleProduct.price}</strike></p>
                    <br />
                    <p>Inclusive of all taxes</p>
                    <h3>{singleProduct.category}</h3>
                    <br />
                    <hr />
                    <p style={{fontSize:'20px'}}><b>Select Size</b></p>
                    <div className="size-select">
                        <button>XXS</button>
                        <button>XS</button>
                        <button>S</button>
                        <button>M</button>
                        <button>L</button>
                        <button>XL</button>
                        <button>XXL</button>
                        <button>3XL</button>
                        <button>4XL</button>
                    </div>

                    {state?.user?.role === "Buyer" ? (
                        <button onClick={addToCart}
                            style={{
                                width: "70%",
                                height: "50px",
                                backgroundColor: "rgb(255,62,108)",
                                fontSize: "22px",
                                fontWeight: "bolder",
                                marginTop:'30px',
                                borderRadius:'10px',
                                color:'white',
                            }}
                            
                            // (singleProduct.id)
                        >
                            Add to cart
                        </button>
                    ) : null}

                    {state?.user && state?.user?.role === "Seller" && (
                        <div>
                           
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{
                                width: "70%",
                                height: "50px",
                                backgroundColor: "rgb(255,62,108)",
                                fontSize: "22px",
                                fontWeight: "bolder",
                                color: "white",
                                border:'none',
                                marginTop:'30px'
                            }}>
                                Update Product
                            </button>


                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Details</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                                        </div>
                                        <div class="modal-body" style={{ color: 'black' }}>



                                            <form onSubmit={handleSubmitProductUpdate}>
                                                <div className="updateProdInputs" >
                                                    <label><b>Image:</b></label><br/>
                                                    <input
                                                        type="text"
                                                        onChange={changeProdDetails}
                                                        name="image"
                                                        placeholder="update image url"
                                                        value={singleProduct.image}
                                                        style={{width:'90%',height:'30px',border:'1px solid black',marginBottom:'15px'}}
                                                    /><br />
                                                    <label><b>Title:</b></label><br/>
                                                    <input
                                                        type="text"
                                                        onChange={changeProdDetails}
                                                        name="title"
                                                        placeholder="update Title"
                                                        value={singleProduct.title}
                                                        style={{width:'90%',height:'30px',border:'1px solid black',marginBottom:'15px'}}
                                                    /><br />
                                                    <label><b>Price:</b></label><br/>
                                                    <input
                                                        type="text"
                                                        onChange={changeProdDetails}
                                                        name="price"
                                                        placeholder="update price"
                                                        value={singleProduct.price}
                                                        style={{width:'90%',height:'30px',border:'1px solid black',marginBottom:'15px'}}
                                                    /><br />
                                                    <label><b>Category:</b></label><br/>
                                                    <select
                                                        value={singleProduct.category}
                                                        onChange={changeProdDetailsCategory}
                                                        style={{width:'90%',height:'30px',border:'1px solid black',marginBottom:'15px'}}
                                                    >
                                                        <option value="Other">Other</option>
                                                        <option value="Mens">Mens</option>
                                                        <option value="Womens">Womens</option>
                                                        <option value="Kids">Kids</option>
                                                        <option value="Fashion">Fashion</option>
                                                        <option value="Accessories">Accessories</option>
                                                    </select>
                                                    <br />
                                                    <button
                                                    style={{width:'60%',height:'40px',backgroundColor:'rgb(255,62,108)',
                                                color:'white',fontSize:'20px',fontWeight:'bold',margin:'30px',border:'none'}}
                                                    >
                                                        Update product
                                                        </button>
                                                </div>


                                            </form>

                                        </div>
                                        {/* <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>



                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
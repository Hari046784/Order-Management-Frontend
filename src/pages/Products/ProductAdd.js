import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./Products.css";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import axios from "axios";

const ProductAdd = () => {
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({
        productImage: "",
        productName: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
    });

    const handleChange = (value) => {
        return setProductDetails((products)=> {
            return {...products, ...value}
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Product Details:", productDetails);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products`, productDetails);
            if(response) {
                setProductDetails({
                    productImage: "",
                    productName: "",
                    brand: "",
                    category: "",
                    price: "",
                    stock: "",
                });
                navigate("/productlist");
            }
        } catch (error) {
            console.log("Error while adding the product:", error);
        };
    };



    return (
        <>
            <div className="productAdd">
                <Sidebar/>
                <div className="productAddContainer">
                    <Navbar/>
                    <div className="addTop d-flex justify-content-between">
                        <h1 className="addNewHeading" style={{ fontSize: "20px", color: "gray" }}>Add New Product</h1>
                        <div style={{ marginRight: "30px" }}>
                            <Link to="/customerlist" className="addLink">
                                <FastRewindIcon />
                                Back
                            </Link>
                        </div>
                    </div>

                    <div className="addBottom">
                        <div className="addLeftSide">
                            <img
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                alt="cameraicon"
                                className="addImage"
                            />
                        </div>
                        <div className="addRightSide">
                            <form className="addForm" onSubmit={handleSubmit}>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Product Name</label>
                                    <input 
                                        className="addInputStyle"
                                        type="text"
                                        placeholder="Eg:Note 10 pro"
                                        required
                                        value={productDetails.productName}
                                        onChange={(e) => handleChange({productName: e.target.value})}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Product Image URL</label>
                                    <input 
                                        className="addInputStyle"
                                        type="text"
                                        placeholder="Eg:https://www.image.com"
                                        required
                                        value={productDetails.productImage}
                                        onChange={(e) => handleChange({productImage: e.target.value})}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Brand</label>
                                    <input 
                                        className="addInputStyle"
                                        type="text"
                                        placeholder="Eg:Redmi"
                                        required
                                        value={productDetails.brand}
                                        onChange={(e) => handleChange({brand: e.target.value})}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Category</label>
                                    <input 
                                        className="addInputStyle"
                                        type="text"
                                        placeholder="Eg:Mobile"
                                        required
                                        value={productDetails.category}
                                        onChange={(e) => handleChange({category: e.target.value})}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Price (₹)</label>
                                    <input 
                                        className="addInputStyle"
                                        type="text"
                                        placeholder="Eg:8888"
                                        required
                                        value={productDetails.price}
                                        onChange={(e) => handleChange({price: e.target.value})}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Stock</label>
                                    <input 
                                        className="addInputStyle"
                                        type="number"
                                        placeholder="Eg:10 Nos"
                                        required
                                        value={productDetails.stock}
                                        onChange={(e) => handleChange({stock: e.target.value})}
                                    />
                                </div>
                                <button type="submit" className="addButton">Add</button>
                            </form>

                        </div>

                    </div>
                
                </div>

            </div>
        </>
    );
};

export default ProductAdd;
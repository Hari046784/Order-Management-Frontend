import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./Products.css";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const ProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    productImage: "",
    productName: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const id = params.id.toString();
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/products/${id}`)
      .then((response) => {
        setProductDetails(response.data);
        console.log("Response:", response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [params.id]);

  const handleChange = (value) => {
    return setProductDetails((products) => {
      return { ...products, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product Details ", productDetails);
    try {
      const id = params.id.toString();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`,
        productDetails
      );
      if (response) {
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
      console.log("Error while adding product: ", error);
    }
  };

  return (
    <>
      <div className="productAdd">
        <Sidebar />
        <div className="productAddContainer">
          <Navbar />
          <div className="addTop d-flex justify-content-between">
            <h1
              className="addHeading"
              style={{ fontSize: "20px", color: "gray" }}
            >
              Update Product Info
            </h1>
            <div style={{ marginRight: "30px" }}>
              <Link to="/customerlist" className="addLink ">
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
              <form onSubmit={handleSubmit} className="addForm">
                <div className="addFormInput">
                  <label className="addLableStyle">Product Name</label>
                  <input
                    className="addInputSytle"
                    type="text"
                    placeholder="note 10 pro"
                    value={productDetails.productName}
                    onChange={(e) =>
                      handleChange({ productName: e.target.value })
                    }
                  />
                </div>
                <div className="addFormInput">
                  <label className="addLableStyle">Product Image URL</label>
                  <input
                    className="addInputSytle"
                    type="text"
                    placeholder="www.image_url.com"
                    value={productDetails.productImage}
                    onChange={(e) =>
                      handleChange({ productImage: e.target.value })
                    }
                  />
                </div>
                <div className="addFormInput">
                  <label className="addLableStyle">Brand</label>
                  <input
                    className="addInputSytle"
                    type="text"
                    placeholder="Redmi"
                    value={productDetails.brand}
                    onChange={(e) => handleChange({ brand: e.target.value })}
                  />
                </div>
                <div className="addFormInput">
                  <label className="addLableStyle">Category</label>
                  <input
                    className="addInputSytle"
                    type="text"
                    placeholder="Mobile"
                    value={productDetails.category}
                    onChange={(e) => handleChange({ category: e.target.value })}
                  />
                </div>
                <div className="addFormInput">
                  <label className="addLableStyle">Price (₹)</label>
                  <input
                    className="addInputSytle"
                    type="number"
                    placeholder="Eg:8888"
                    value={productDetails.price}
                    onChange={(e) => handleChange({ price: e.target.value })}
                  />
                </div>
                <div className="addFormInput">
                  <label className="addLableStyle">Stock</label>
                  <input
                    className="addInputSytle"
                    type="number"
                    placeholder="Eg:10 Nos"
                    value={productDetails.stock}
                    onChange={(e) => handleChange({ stock: e.target.value })}
                  />
                </div>
                <button type="submit" className="addButton">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;

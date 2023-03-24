import React, { useEffect, useState } from "react";
import "./Products.css";
import AddIcon from '@mui/icons-material/Add';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
// import { isAuthenticated } from "../../utils/auth";
import Button from "@mui/material/Button";


const ProductList = () => {
    const [productData, setProductData] = useState([]);
    // const { token } = isAuthenticated();

    useEffect(() => {
        getProducts();
        
    }, []);

    const getProducts = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
            if (response) {
                setProductData(response.data);
                console.log("Response:", response);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/products/${id}`
          );
          if (response) {
            getProducts();
          }
        } catch (error) {
          console.log("Error: ", error);
        }
    };

    return (
        <>
            <div className="productList">
                <Sidebar />
                <div className="productListContainer">
                    <Navbar />
                    <div className="productListHeading my-2">
                        <div style={{ marginLeft: "30px" }}>Product List</div>
                        <div style={{ marginRight: "30px" }}>
                            <Link to="/productadd" className="addLink">
                                <AddIcon />
                                Add New
                            </Link>
                        </div>
                    </div>

                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className="tableCell text-secondary">#</TableCell>
                                    <TableCell align="center" className="tableCell text-primary">Product</TableCell>
                                    <TableCell align="center" className="tableCell text-primary">Brand</TableCell>
                                    <TableCell align="center" className="tableCell text-primary">Category</TableCell>
                                    <TableCell align="center" className="tableCell text-primary">Price (₹)</TableCell>
                                    <TableCell align="center" className="tableCell text-primary">Stock</TableCell>
                                    <TableCell align="center" className="tableCell text-secondary">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productData.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center" className="tableCell">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <div>
                                                <img 
                                                    src={row.productImage}
                                                    alt=""
                                                    className="productImage"
                                                />
                                                {row.productName}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.brand}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.category}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.price}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.stock}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <Link to={`/${row._id}/productupdate`} style={{ textDecoration: "none"}}>
                                                <Button variant="outlined" color="success">Edit</Button>
                                            </Link>
                                            &nbsp; &nbsp;
                                            <Button 
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(row._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>

                </div>
            </div>
        </>
    );
};

export default ProductList;
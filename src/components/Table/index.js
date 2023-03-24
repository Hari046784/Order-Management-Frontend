import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Table.css";
import Tables from '@mui/material/Table';


const Table = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(()=> {
        getOrders();
    },[]);

    const getOrders = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders`);
            console.log("Response:", response);
            if (response) {
                setOrderData(response.data);
            };
        } catch (error) {
            console.log("Error:", error);
        };
    };

    return (
        <>
            <TableContainer component={Paper} className="table">
                <Tables sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className="tableCell text-secondary">
                                #
                            </TableCell>

                            <TableCell align="center" className="tableCell text-primary">
                                Product
                            </TableCell>

                            <TableCell align="center" className="tableCell text-primary">
                                Customer
                            </TableCell>

                            <TableCell align="center" className="tableCell text-primary">
                                Date
                            </TableCell>

                            <TableCell align="center" className="tableCell text-primary">
                                Amount(₹)
                            </TableCell>

                            <TableCell align="center" className="tableCell text-primary">
                                Address
                            </TableCell>

                            <TableCell align="center" className="tableCell text-primary">
                                Payment Method
                            </TableCell>

                            <TableCell align="center" className="tableCell text-primary">
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orderData.map((row, index) => (
                            <TableRow key = {row.id}>
                                <TableCell align="center" className="tableCell">
                                    {index + 1}
                                </TableCell>

                                <TableCell align="center" className="tableCell">
                                    <div className="cellWrapper">
                                        <img src={row.productImg} alt="" className="orderImage"/>
                                        {row.productName}
                                    </div>
                                </TableCell>

                                <TableCell align="center" className="tableCell">
                                    {row.customerName}
                                </TableCell>

                                <TableCell align="center" className="tableCell">
                                    {row.date}
                                </TableCell>

                                <TableCell align="center" className="tableCell">
                                    {row.amount}
                                </TableCell>

                                <TableCell align="center" className="tableCell">
                                    {row.address}
                                </TableCell>

                                <TableCell align="center" className="tableCell">
                                    {row.paymentMethod}
                                </TableCell>

                                <TableCell align="center" className="tableCell">
                                    <span className={`orderStatus ${row.status}`}>
                                        {row.status}
                                    </span>
                                </TableCell>
                            </TableRow>


                        )

                        )}
                    </TableBody>

                </Tables>

            </TableContainer>
        </>
    );
};

export default Table;
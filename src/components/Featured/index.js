import React, { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import axios from "axios";
import "./Featured.css";



const Featured = () => {

    const [dashboardOrderDetails, setDashboardOrderDetails] = useState({});

    useEffect(()=> {
        getDashBoardOrderDetails();
    }, []);

    const getDashBoardOrderDetails = async () => {
        try {
            let value = await axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard-total-orders`);
        const { data } = value;
        setDashboardOrderDetails(data);
        } catch (error) {
            console.log("Error",error);
        };
    };

    return (
        <>
            <div className="featured">
                <div className="featured_top">
                    <h1 className="featured_title">Total revenue for Orders</h1>
                    <MoreVertIcon fontSize="small" />
                </div>
                <div className="feaured_bottom">
                    <diV className="featured_chart">
                        <CircularProgressbar
                            value={
                                ((dashboardOrderDetails.totalRevenueFromOrders * 100) / 2000000).toFixed(2)
                            }
                            text={
                                ((dashboardOrderDetails.totalRevenueFromOrders * 100) / 2000000).toFixed(2)
                            }
                            strokeWidth={7}
                        />
                    </diV>
                    <p className="para">Total sales made this month</p>
                    <p className="amount">₹ {dashboardOrderDetails.totalRevenueFromOrders} </p>
                    <p className="desc">Total sales to be achieved this month</p>
                    <div className="summary">
                        <div className="summary_item">
                            <div className="itemTitle">Target</div>
                                <div className="itemResult positive">
                                    <div className="resultAmount">₹ 2000000</div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Featured;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Widget.css";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';



const Widget = ({ type }) => {
    const [dashboardProductDetails, setDashboardProductDetails] = useState({});
    const [dashboardOrderDetails, setDashboardOrderDetails] = useState({});
    const [dashboardCustomerDetails, setDashboardCustomerDetails] = useState({});

    useEffect(() => {
        getDashboardProductDetails();
    },[]);

    useEffect(() => {
        getDashboardOrderDetails();
    },[]);

    useEffect(() => {
        getDashboardCustomerDetails();
    },[]);

    const getDashboardProductDetails = async () => {
        try{
            let value = await axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard-total-products`);
            const { data } = value;
            setDashboardProductDetails(data);
        } catch (error) {
            console.log("Error:", error);
        };
    };

    const getDashboardOrderDetails = async () => {
        try{
            let value = await axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard-total-orders`);
            const { data } = value;
            setDashboardOrderDetails(data);
        } catch (error) {
            console.log("Error:", error);
        };
    };

    const getDashboardCustomerDetails = async () => {
        try{
            let value = await axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard-total-customers`);
            const { data } = value;
            setDashboardCustomerDetails(data);
        } catch (error) {
            console.log("Error:", error);
        };
    };

    let data;
    console.log("type:",type)

    switch (type) {
        case "user":
            data = {
                title: "CUSTOMERS",
                total: dashboardCustomerDetails.totalCustomers,
                link: (
                    <Link to="/customerlist" style={{ textDecoration: "none" }}>See All Customers</Link>
                ),
                icon: (
                    <PersonOutlinedIcon
                    className="widget_icon"
                    style={{
                        color: "crimson",
                        backgroundColor: "rgba(255, 0, 0, 0.2)"
                    }} />
                ),
            };
            break;
        case "order":
            data = {
                title: "PRODUCTS",
                total: dashboardProductDetails.totalProducts,
                link: (
                    <Link to="/productlist" style={{ textDecoration: "none" }}>View All Products</Link>
                ),
                icon: (
                    <ShoppingCartOutlinedIcon
                    className="widget_icon"
                    style={{
                        color: "goldenrod",
                        backgroundColor: "rgba(218, 165, 32, 0.2)"
                    }} />
                ),
            };
            break;
        case "earning":
            data = {
                title: "ORDERS",
                total: dashboardOrderDetails.totalOrders,
                link: (
                    <Link to="/orderlist" style={{ textDecoration: "none" }}>View All Orders</Link>
                ),
                icon: (
                    <LocalShippingOutlinedIcon
                    className="widget_icon"
                    style={{
                        color: "green",
                        backgroundColor: "rgba(0, 128, 0, 0.2)"
                    }} />
                ),
            };
            break;
        case "balance":
            data = {
                title: "STOCKS",
                total: dashboardProductDetails.totalAvailableStock,
                link: (
                    <Link to="/productlist" style={{ textDecoration: "none" }}>See All Stocks Details</Link>
                ),
                icon: (
                    <WarehouseOutlinedIcon
                    className="widget_icon"
                    style={{
                        color: "purple",
                        backgroundColor: "rgba(128, 0, 128, 0.2)"
                    }} />
                ),
            };
            break;
        default:
            break;
        
    };



    return (
        <div className="widget">
            <div className="left">
                <span className="widget_titles">{data.title}</span>
                <span className="widget_counters">{data.total}</span>
                <span className="widget_links">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage"></div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
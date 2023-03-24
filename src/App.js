import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CustomerAdd from "./pages/Customers/CustomerAdd";
import CustomerList from "./pages/Customers/CustomerList";
import CustomerUpdate from "./pages/Customers/CustomerUpdate";
import OrderAdd from "./pages/Orders/OrderAdd";
import OrderList from "./pages/Orders/OrderList";
import OrderUpdate from "./pages/Orders/OrderUpdate";
import ProductAdd from "./pages/Products/ProductAdd";
import ProductList from "./pages/Products/ProductList";
import ProductUpdate from "./pages/Products/ProductUpdate";

// import './App.css';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/customeradd" element={<CustomerAdd />} />
            <Route path="/customerlist" element={<CustomerList />} />
            <Route path="/:id/customerupdate" element={<CustomerUpdate />} />
            <Route path="/orderadd" element={<OrderAdd />} />
            <Route path="/orderlist" element={<OrderList />} />
            <Route path="/:id/orderupdate" element={<OrderUpdate />} />
            <Route path="/productadd" element={<ProductAdd />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/:id/productupdate" element={<ProductUpdate />} />

          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;

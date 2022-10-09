import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrderPage from "../pages/CreateOrderPage/CreateOrderPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/produtos" element={<ProductsPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/pedidos/criar" element={<CreateOrderPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

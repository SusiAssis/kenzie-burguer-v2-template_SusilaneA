import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ShopPage from "../pages/ShopPage";
import { CartProvider } from "../providers/CartContext";
import { ProtectedRoutes } from "../components/ProtectedRoutes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/shop" element={<ProtectedRoutes />}>
        <Route
          index
          element={
            <CartProvider>
              <ShopPage />
            </CartProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
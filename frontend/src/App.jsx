import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./pages/Register";
import { CartScreen } from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import ProductDetail from "./pages/ProductDetail";
import SigninPage from "./pages/SigninPage.jsx";
import ShippingAddress from "./pages/ShippingAddress";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/slug/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;

import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./pages/HomeScreen";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <>
      <Header />
      <Container >
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;

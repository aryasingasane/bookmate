import { Route, Routes } from "react-router-dom";
//css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
import RegisterPage from "./pages/Register";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Details";
import OrdersPage from "./pages/ViewOrders";
import UserPage from "./pages/User";
import LoginPage from "./pages/Login";
//components
import MyNavbar from "./components/Navbar";

function App() {
  return (
    <div>
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/book/list" element={<ListingPage />}></Route>
        <Route path="/book/view/:bookId" element={<BookDetailPage />}></Route>
        <Route path="/book/orders" element={<OrdersPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

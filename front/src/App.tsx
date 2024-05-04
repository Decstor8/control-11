import './App.css'
import {Route, Routes} from "react-router-dom";
import AppMainBar from "./components/AppMainBar";
import Login from "./features/Users/Login";
import Register from "./features/Users/Register";
import Products from "./features/Products/Products";
import ProductForm from "./features/Products/ProductForm";
import ProductData from "./features/Products/ProductData";

function App() {
    return (
        <>
            <header>
                <AppMainBar />
            </header>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add/product" element={<ProductForm />} />
                <Route path="/:id" element={<Products />} />
                <Route path="/product/:id" element={<ProductData />} />
            </Routes>
        </>
    )
}

export default App;

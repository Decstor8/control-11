import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import AppMainBar from "./components/AppMainBar";
import Login from "./features/Users/Login";
import Register from "./features/Users/Register";

function App() {
  const [count, setCount] = useState(0)

  return (
      <>

          <header>
              <AppMainBar />
          </header>
          <Routes>
              <Route path="/" element={'*'} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path='*' element={<h2>Not found!</h2>} />
          </Routes>
      </>
  )
}

export default App

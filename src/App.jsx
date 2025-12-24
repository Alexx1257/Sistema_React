import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login/login"
import Dashboard from "./pages/Home/Dashboard"


function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App

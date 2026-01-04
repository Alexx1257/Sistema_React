import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Home/Dashboard";

function App() {
  return (
    // Quitamos el centrado flex para que el Dashboard ocupe el 100% real
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Ruta raíz para el Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta del Dashboard con comodín (/*). 
          Esto permite que Dashboard maneje sus propias sub-rutas 
          como /dashboard/cpu, /dashboard/monitores, etc.
        */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* Redirección por defecto si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
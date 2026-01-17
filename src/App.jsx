import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Home/Dashboard";
// Nuevo código: Importación de Toaster de sonner
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nuevo código: Componente Toaster para renderizar las alertas */}
      <Toaster position="top-right" richColors closeButton />
      
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
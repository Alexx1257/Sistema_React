import React from 'react';
import BrandingPanel from './Components/BrandingPanel';
import LoginForm from './Components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-0 md:p-6">
      {/* Tarjeta principal */}
      <div className="w-full max-w-5xl bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] flex flex-col md:flex-row min-h-[650px] md:rounded-3xl overflow-hidden">

        {/* PANEL IZQUIERDO: Branding */}
        <BrandingPanel />

        {/* PANEL DERECHO: Formulario */}
        <LoginForm />

      </div>
    </div>
  );
};

export default Login;
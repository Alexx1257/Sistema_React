import React, { useState, useEffect } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberEmail, setRememberEmail] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberEmail(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Lógica de validación...
        setTimeout(() => { setIsSubmitting(false); alert(`Login exitoso`); }, 1000);
    };

    const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ui-primary focus:ring-2 focus:ring-ui-accent transition-all duration-200 outline-none bg-gray-50 text-gray-800";
    const errorInputClasses = "border-red-500 focus:border-red-500 focus:ring-red-100";

    return (
        <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center bg-white">
            <div className="md:hidden flex flex-col items-center mb-10">
                <div className="bg-ui-primary p-3 rounded-xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestión</h1>
            </div>
            <div className="max-w-sm mx-auto w-full">
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Bienvenido</h2>
                    <p className="text-gray-500 text-lg font-light">Ingresa tus credenciales de acceso</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-xs uppercase tracking-widest">Correo Corporativo</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`} placeholder="usuario@empresa.com" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-700 font-bold text-xs uppercase tracking-widest">Contraseña</label>
                            <a href="#" className="text-xs font-bold text-ui-primary hover:text-ui-primaryHover uppercase tracking-tighter transition-colors">¿Olvidaste tu clave?</a>
                        </div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClasses} ${errors.password ? errorInputClasses : ''}`} placeholder="••••••••" />
                    </div>
                    <div className="py-2">
                        <label className="flex items-center group cursor-pointer w-fit">
                            <div className="relative flex items-center justify-center">
                                <input type="checkbox" checked={rememberEmail} onChange={(e) => setRememberEmail(e.target.checked)} className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:border-ui-primary checked:bg-ui-primary transition-all" />
                                <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Recordar mi sesión</span>
                        </label>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-ui-primary hover:bg-ui-primaryHover text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center">
                        {isSubmitting ? 'Autenticando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
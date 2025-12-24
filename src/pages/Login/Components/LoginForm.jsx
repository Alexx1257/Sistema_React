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
        setErrors({});

        const validationErrors = {};
        if (!email.trim()) {
            validationErrors.email = 'El correo electrónico es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Por favor, introduce un correo válido';
        }

        if (!password) {
            validationErrors.password = 'La contraseña es obligatoria';
        } else if (password.length < 6) {
            validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        if (rememberEmail) {
            localStorage.setItem('savedEmail', email);
        } else {
            localStorage.removeItem('savedEmail');
        }

        setTimeout(() => {
            console.log('Iniciando sesión con:', { email, password });
            setIsSubmitting(false);
            alert(`Login exitoso para ${email}`);
        }, 1000);
    };

    const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50 text-gray-800";
    const errorInputClasses = "border-red-500 focus:border-red-500 focus:ring-red-100";

    return (
        <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center bg-white">
            {/* Logo móvil */}
            <div className="md:hidden flex flex-col items-center mb-10">
                <div className="bg-blue-600 p-3 rounded-xl mb-4 shadow-lg">
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

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-xs uppercase tracking-widest">
                            Correo Corporativo
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
                            placeholder="usuario@empresa.com"
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                                <span>×</span> {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="block text-gray-700 font-bold text-xs uppercase tracking-widest">
                                Contraseña
                            </label>
                            <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tighter transition-colors">
                                ¿Olvidaste tu clave?
                            </a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputClasses} ${errors.password ? errorInputClasses : ''}`}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                                <span>×</span> {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="py-2">
                        <label className="flex items-center group cursor-pointer w-fit">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={rememberEmail}
                                    onChange={(e) => setRememberEmail(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:border-blue-600 checked:bg-blue-600 transition-all"
                                />
                                <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                                Recordar mi sesión
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Autenticando...
                            </>
                        ) : 'Iniciar Sesión'}
                    </button>
                </form>

                <footer className="mt-12 text-center">
                    <p className="text-gray-400 text-sm">
                        ¿Problemas de acceso? <br className="md:hidden" />
                        <a href="#" className="text-blue-600 font-bold hover:text-blue-800 transition-colors ml-1">Contactar con soporte</a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default LoginForm;
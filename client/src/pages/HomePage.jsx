import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import institution from './img/institution.png'
import logo from './img/logo.png'

const HomePage = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (role) => {
        if (role === 'user') {
            navigate('/user');
        } else if (role === 'admin') {
            navigate('/admin');
        } else if (role === 'teacher') {
            navigate('/teacher');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div
                className="relative h-screen bg-cover bg-center rounded-md"
                style={{
                    backgroundImage: `url(${institution})`,
                    transform: `translateY(${scrollY * 0.05}px)`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-md">
                    <img
                        src= {logo}
                        alt="Institution Logo"
                        className="w-32 h-36 mb-4"
                        style={{transform: `translateY(${scrollY * 0.44}px)`,}}
                    />
                    <h1 className="text-white text-5xl font-bold" style={{transform: `translateY(${scrollY * 0.39}px)`,}}>Instituto Tecnológico de Saltillo</h1>
                </div>
            </div>

            <div className="flex-1 py-16 px-8 text-center">
                <h2 className="text-black text-3xl font-bold mb-4">Bienvenidos a nuestro portal de asesorías</h2>
                <p className="text-lg text-gray-700 mb-8">
                Nuestra página web está diseñada para gestionar y facilitar las asesorías académicas dentro del Instituto
                Tenológico de Saltillo. Su propósito principal es conectar a estudiantes y profesores,
                 brindando un espacio organizado donde se puedan programar, visualizar y administrar asesorías de manera 
                 eficiente. Además, promueve la comunicación y el seguimiento efectivo de las actividades académicas, 
                 contribuyendo al éxito de la comunidad educativa.
                </p>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => handleNavigation('user')}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    >
                        Usuario
                    </button>
                    <button
                        onClick={() => handleNavigation('admin')}
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                    >
                        Administrador
                    </button>
                    <button
                        onClick={() => handleNavigation('teacher')}
                        className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
                    >
                        Profesor
                    </button>
                    <button
                        onClick={() => handleNavigation(null)}
                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                    >
                        Login
                    </button>
                </div>
            </div>

            <footer className="bg-gray-800 text-white py-8 rounded-md">
                <div className="text-center">
                    <p className="mb-2">Contáctanos:</p>
                    <p className="mb-2">Email: erikyeudiel@hotmail.com <br/> acostasosaeduardo@gmail.com</p>
        <p className="mb-2">Teléfono: +52 844 463 9263 <br/> +52 844 392 4145</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <a href="https://www.facebook.com/its" target="_blank" rel="noopener noreferrer" className="text-blue-400">Facebook</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-300">Twitter</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-400">Instagram</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

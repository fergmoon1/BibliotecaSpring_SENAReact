import React, { useState } from 'react';
import LibroList from './LibroList';
import RevistaList from './RevistaList';
import DvdList from './DvdList';
import Catalog from './Catalog';
import './App.css';

function App() {
    const [activeSection, setActiveSection] = useState('libros');
    const [mode, setMode] = useState('list');
    const [showHelp, setShowHelp] = useState(false);

    const renderSection = () => {
        switch (activeSection) {
            case 'libros':
                return <LibroList mode={mode} setMode={setMode} />;
            case 'revistas':
                return <RevistaList mode={mode} setMode={setMode} />;
            case 'dvds':
                return <DvdList mode={mode} setMode={setMode} />;
            case 'catalog':
                return <Catalog />;
            default:
                return <LibroList mode={mode} setMode={setMode} />;
        }
    };

    return (
        <div className="App min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Biblioteca</h1>
                <nav className="mt-2">
                    <button
                        onClick={() => { setActiveSection('libros'); setMode('list'); }}
                        className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Libros
                    </button>
                    <button
                        onClick={() => { setActiveSection('revistas'); setMode('list'); }}
                        className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Revistas
                    </button>
                    <button
                        onClick={() => { setActiveSection('dvds'); setMode('list'); }}
                        className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        DVDs
                    </button>
                    <button
                        onClick={() => setActiveSection('catalog')}
                        className="mr-2 p-2 bg-purple-500 text-white rounded hover:bg-purple-700"
                    >
                        Catálogo
                    </button>
                    {mode === 'list' && (
                        <button
                            onClick={() => setMode('create')}
                            className="ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
                        >
                            Crear Nuevo
                        </button>
                    )}
                    <button
                        onClick={() => setShowHelp(true)}
                        className="ml-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                    >
                        Ayuda
                    </button>
                </nav>
            </header>
            <main className="container mx-auto p-4">
                {renderSection()}
            </main>
            {showHelp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                        <h2 className="text-xl font-bold mb-4">Cómo Usar la Aplicación</h2>
                        <p className="mb-2">1. Usa los botones de navegación (Libros, Revistas, DVDs, Catálogo) para ver las secciones.</p>
                        <p className="mb-2">2. Haz clic en 'Crear Nuevo' para agregar un elemento nuevo.</p>
                        <p className="mb-2">3. Selecciona 'Editar' para modificar un elemento existente y 'Guardar' para confirmar.</p>
                        <p className="mb-2">4. Usa 'Eliminar' para borrar un elemento.</p>
                        <p className="mb-2">5. El Catálogo muestra todos los elementos en una sola vista.</p>
                        <button
                            onClick={() => setShowHelp(false)}
                            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
import React, { useState } from 'react';
import LibroList from './LibroList';
import RevistaList from './RevistaList';
import DvdList from './DvdList';
import './App.css';

function App() {
    const [activeSection, setActiveSection] = useState('libros');
    const [mode, setMode] = useState('list'); // 'list', 'create', 'edit'

    const renderSection = () => {
        switch (activeSection) {
            case 'libros':
                return <LibroList mode={mode} setMode={setMode} />;
            case 'revistas':
                return <RevistaList mode={mode} setMode={setMode} />;
            case 'dvds':
                return <DvdList mode={mode} setMode={setMode} />;
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
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        DVDs
                    </button>
                    {mode === 'list' && (
                        <button
                            onClick={() => setMode('create')}
                            className="ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
                        >
                            Crear Nuevo
                        </button>
                    )}
                </nav>
            </header>
            <main className="container mx-auto p-4">
                {renderSection()}
            </main>
        </div>
    );
}

export default App;
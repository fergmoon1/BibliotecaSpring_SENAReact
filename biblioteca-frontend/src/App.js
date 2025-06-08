import React, { useState } from 'react';
import LibroList from './LibroList';
import RevistaList from './RevistaList';
import DvdList from './DvdList';
import './App.css';

function App() {
    const [activeSection, setActiveSection] = useState('libros');

    const renderSection = () => {
        switch (activeSection) {
            case 'libros':
                return <LibroList />;
            case 'revistas':
                return <RevistaList />;
            case 'dvds':
                return <DvdList />;
            default:
                return <LibroList />;
        }
    };

    return (
        <div className="App min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Biblioteca</h1>
                <nav className="mt-2">
                    <button
                        onClick={() => setActiveSection('libros')}
                        className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Libros
                    </button>
                    <button
                        onClick={() => setActiveSection('revistas')}
                        className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Revistas
                    </button>
                    <button
                        onClick={() => setActiveSection('dvds')}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        DVDs
                    </button>
                </nav>
            </header>
            <main className="container mx-auto p-4">
                {renderSection()}
            </main>
        </div>
    );
}

export default App;
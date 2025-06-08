import React from 'react';
import LibroList from './LibroList';
import './App.css';

function App() {
    return (
        <div className="App min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Biblioteca</h1>
            </header>
            <main className="container mx-auto p-4">
                <LibroList />
            </main>
        </div>
    );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibroList = () => {
    const [libros, setLibros] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching libros from http://localhost:8081/api/libros...');
        axios.get('http://localhost:8081/api/libros', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                console.log('Datos recibidos:', response.data);
                setLibros(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching libros:', error.message, error.response ? error.response.data : 'No response data');
                setError('Error al cargar los libros. Revisa la consola para más detalles.');
            });
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Lista de Libros</h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-2 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
                    <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                        <th className="p-2 border-b">Título</th>
                        <th className="p-2 border-b">Autor</th>
                        <th className="p-2 border-b">ISBN</th>
                        <th className="p-2 border-b">Páginas</th>
                        <th className="p-2 border-b">Fecha Publicación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id} className="text-sm text-gray-700 border-b">
                            <td className="p-2">{libro.titulo}</td>
                            <td className="p-2">{libro.autor}</td>
                            <td className="p-2">{libro.isbn}</td>
                            <td className="p-2">{libro.numeroPaginas}</td>
                            <td className="p-2">{libro.fechaPublicacion}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {libros.length === 0 && !error && <p className="text-sm text-gray-500 mt-2">No hay libros disponibles.</p>}
        </div>
    );
};

export default LibroList;
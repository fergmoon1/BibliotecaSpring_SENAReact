import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DvdList = () => {
    const [dvds, setDvds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching dvds from http://localhost:8081/api/dvds...');
        axios.get('http://localhost:8081/api/dvds', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                console.log('Datos recibidos:', response.data);
                setDvds(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching dvds:', error.message, error.response ? error.response.data : 'No response data');
                setError('Error al cargar los DVDs. Revisa la consola para más detalles.');
            });
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Lista de DVDs</h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-2 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
                    <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                        <th className="p-2 border-b">Título</th>
                        <th className="p-2 border-b">Director</th>
                        <th className="p-2 border-b">Género</th>
                        <th className="p-2 border-b">Duración</th>
                        <th className="p-2 border-b">Fecha Publicación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dvds.map(dvd => (
                        <tr key={dvd.id} className="text-sm text-gray-700 border-b">
                            <td className="p-2">{dvd.titulo}</td>
                            <td className="p-2">{dvd.director}</td>
                            <td className="p-2">{dvd.genero}</td>
                            <td className="p-2">{dvd.duracion} min</td>
                            <td className="p-2">{dvd.fechaPublicacion}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {dvds.length === 0 && !error && <p className="text-sm text-gray-500 mt-2">No hay DVDs disponibles.</p>}
        </div>
    );
};

export default DvdList;
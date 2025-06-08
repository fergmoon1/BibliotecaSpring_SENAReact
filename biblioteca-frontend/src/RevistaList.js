import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RevistaList = () => {
    const [revistas, setRevistas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching revistas from http://localhost:8081/api/revistas...');
        axios.get('http://localhost:8081/api/revistas', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                console.log('Datos recibidos:', response.data);
                setRevistas(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching revistas:', error.message, error.response ? error.response.data : 'No response data');
                setError('Error al cargar las revistas. Revisa la consola para más detalles.');
            });
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Lista de Revistas</h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-2 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
                    <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                        <th className="p-2 border-b">Título</th>
                        <th className="p-2 border-b">Categoría</th>
                        <th className="p-2 border-b">Número</th>
                        <th className="p-2 border-b">Editorial</th>
                        <th className="p-2 border-b">Fecha Publicación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {revistas.map(revista => (
                        <tr key={revista.id} className="text-sm text-gray-700 border-b">
                            <td className="p-2">{revista.titulo}</td>
                            <td className="p-2">{revista.categoria}</td>
                            <td className="p-2">{revista.numero}</td>
                            <td className="p-2">{revista.editorial}</td>
                            <td className="p-2">{revista.fechaPublicacion}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {revistas.length === 0 && !error && <p className="text-sm text-gray-500 mt-2">No hay revistas disponibles.</p>}
        </div>
    );
};

export default RevistaList;
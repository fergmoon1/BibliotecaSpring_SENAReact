import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Catalog = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const [librosResponse, revistasResponse, dvdsResponse] = await Promise.all([
                    axios.get('http://localhost:8081/api/libros', { headers: { 'Content-Type': 'application/json' } }),
                    axios.get('http://localhost:8081/api/revistas', { headers: { 'Content-Type': 'application/json' } }),
                    axios.get('http://localhost:8081/api/dvds', { headers: { 'Content-Type': 'application/json' } }),
                ]);
                const allItems = [
                    ...librosResponse.data.map(item => ({ ...item, type: 'Libro' })),
                    ...revistasResponse.data.map(item => ({ ...item, type: 'Revista' })),
                    ...dvdsResponse.data.map(item => ({ ...item, type: 'DVD' })),
                ];
                setItems(allItems);
                setError(null);
            } catch (error) {
                console.error('Error fetching catalog:', error.message, error.response ? error.response.data : 'No response data');
                setError('Error al cargar el catálogo. Revisa la consola para más detalles.');
            }
        };
        fetchAllItems();
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Catálogo Completo</h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-2 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
                    <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                        <th className="p-2 border-b">Tipo</th>
                        <th className="p-2 border-b">Título</th>
                        <th className="p-2 border-b">Fecha Publicación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="text-sm text-gray-700 border-b">
                            <td className="p-2">{item.type}</td>
                            <td className="p-2">{item.titulo}</td>
                            <td className="p-2">{item.fechaPublicacion}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {items.length === 0 && !error && <p className="text-sm text-gray-500 mt-2">No hay elementos en el catálogo.</p>}
        </div>
    );
};

export default Catalog;
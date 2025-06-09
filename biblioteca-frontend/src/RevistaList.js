import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RevistaList = ({ mode, setMode }) => {
    const [revistas, setRevistas] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        titulo: '',
        categoria: '',
        numero: '',
        editorial: '',
        fechaPublicacion: '',
    });
    const [selectedId, setSelectedId] = useState(null);

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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateOrUpdate = () => {
        if (mode === 'create') {
            axios.post('http://localhost:8081/api/revistas', formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    setRevistas([...revistas, response.data]);
                    setFormData({ id: null, titulo: '', categoria: '', numero: '', editorial: '', fechaPublicacion: '' });
                    setMode('list');
                })
                .catch(error => console.error('Error creating revista:', error));
        } else if (mode === 'edit') {
            axios.put(`http://localhost:8081/api/revistas/${selectedId}`, formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    setRevistas(revistas.map(revista => (revista.id === selectedId ? response.data : revista)));
                    setFormData({ id: null, titulo: '', categoria: '', numero: '', editorial: '', fechaPublicacion: '' });
                    setMode('list');
                })
                .catch(error => console.error('Error updating revista:', error));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/api/revistas/${id}`)
            .then(() => {
                setRevistas(revistas.filter(revista => revista.id !== id));
            })
            .catch(error => console.error('Error deleting revista:', error));
    };

    const handleEdit = (revista) => {
        setFormData({
            id: revista.id,
            titulo: revista.titulo,
            categoria: revista.categoria,
            numero: revista.numero,
            editorial: revista.editorial,
            fechaPublicacion: revista.fechaPublicacion,
        });
        setSelectedId(revista.id);
        setMode('edit');
    };

    if (mode !== 'list') {
        return (
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    {mode === 'create' ? 'Crear Nueva Revista' : 'Editar Revista'}
                </h2>
                <div className="mt-2">
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        placeholder="Título"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        placeholder="Categoría"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="number"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        placeholder="Número"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="text"
                        name="editorial"
                        value={formData.editorial}
                        onChange={handleInputChange}
                        placeholder="Editorial"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="date"
                        name="fechaPublicacion"
                        value={formData.fechaPublicacion}
                        onChange={handleInputChange}
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <button
                        onClick={handleCreateOrUpdate}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {mode === 'create' ? 'Crear' : 'Guardar'}
                    </button>
                    <button
                        onClick={() => { setMode('list'); setFormData({ id: null, titulo: '', categoria: '', numero: '', editorial: '', fechaPublicacion: '' }); }}
                        className="ml-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

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
                        <th className="p-2 border-b">Acciones</th>
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
                            <td className="p-2">
                                <button
                                    onClick={() => handleEdit(revista)}
                                    className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-1"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(revista.id)}
                                    className="p-1 bg-red-500 text-white rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </td>
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
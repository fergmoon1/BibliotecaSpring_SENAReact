import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DvdList = ({ mode, setMode }) => {
    const [dvds, setDvds] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        titulo: '',
        director: '',
        genero: '',
        duracion: '',
        fechaPublicacion: '',
    });
    const [selectedId, setSelectedId] = useState(null);

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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateOrUpdate = () => {
        if (mode === 'create') {
            axios.post('http://localhost:8081/api/dvds', formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    setDvds([...dvds, response.data]);
                    setFormData({ id: null, titulo: '', director: '', genero: '', duracion: '', fechaPublicacion: '' });
                    setMode('list');
                })
                .catch(error => console.error('Error creating dvd:', error));
        } else if (mode === 'edit') {
            axios.put(`http://localhost:8081/api/dvds/${selectedId}`, formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    setDvds(dvds.map(dvd => (dvd.id === selectedId ? response.data : dvd)));
                    setFormData({ id: null, titulo: '', director: '', genero: '', duracion: '', fechaPublicacion: '' });
                    setMode('list');
                })
                .catch(error => console.error('Error updating dvd:', error));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/api/dvds/${id}`)
            .then(() => {
                setDvds(dvds.filter(dvd => dvd.id !== id));
            })
            .catch(error => console.error('Error deleting dvd:', error));
    };

    const handleEdit = (dvd) => {
        setFormData({
            id: dvd.id,
            titulo: dvd.titulo,
            director: dvd.director,
            genero: dvd.genero,
            duracion: dvd.duracion,
            fechaPublicacion: dvd.fechaPublicacion,
        });
        setSelectedId(dvd.id);
        setMode('edit');
    };

    if (mode !== 'list') {
        return (
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    {mode === 'create' ? 'Crear Nuevo DVD' : 'Editar DVD'}
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
                        name="director"
                        value={formData.director}
                        onChange={handleInputChange}
                        placeholder="Director"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="text"
                        name="genero"
                        value={formData.genero}
                        onChange={handleInputChange}
                        placeholder="Género"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="number"
                        name="duracion"
                        value={formData.duracion}
                        onChange={handleInputChange}
                        placeholder="Duración (min)"
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
                        onClick={() => { setMode('list'); setFormData({ id: null, titulo: '', director: '', genero: '', duracion: '', fechaPublicacion: '' }); }}
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
                        <th className="p-2 border-b">Acciones</th>
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
                            <td className="p-2">
                                <button
                                    onClick={() => handleEdit(dvd)}
                                    className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-1"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(dvd.id)}
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
            {dvds.length === 0 && !error && <p className="text-sm text-gray-500 mt-2">No hay DVDs disponibles.</p>}
        </div>
    );
};

export default DvdList;
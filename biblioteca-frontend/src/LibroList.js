import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibroList = ({ mode, setMode }) => {
    const [libros, setLibros] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        titulo: '',
        autor: '',
        isbn: '',
        numeroPaginas: '',
        fechaPublicacion: '',
    });
    const [selectedId, setSelectedId] = useState(null);

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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateOrUpdate = () => {
        if (mode === 'create') {
            axios.post('http://localhost:8081/api/libros', formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    setLibros([...libros, response.data]);
                    setFormData({ id: null, titulo: '', autor: '', isbn: '', numeroPaginas: '', fechaPublicacion: '' });
                    setMode('list');
                })
                .catch(error => console.error('Error creating libro:', error));
        } else if (mode === 'edit') {
            axios.put(`http://localhost:8081/api/libros/${selectedId}`, formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    setLibros(libros.map(libro => (libro.id === selectedId ? response.data : libro)));
                    setFormData({ id: null, titulo: '', autor: '', isbn: '', numeroPaginas: '', fechaPublicacion: '' });
                    setMode('list');
                })
                .catch(error => console.error('Error updating libro:', error));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/api/libros/${id}`)
            .then(() => {
                setLibros(libros.filter(libro => libro.id !== id));
            })
            .catch(error => console.error('Error deleting libro:', error));
    };

    const handleEdit = (libro) => {
        setFormData({
            id: libro.id,
            titulo: libro.titulo,
            autor: libro.autor,
            isbn: libro.isbn,
            numeroPaginas: libro.numeroPaginas,
            fechaPublicacion: libro.fechaPublicacion,
        });
        setSelectedId(libro.id);
        setMode('edit');
    };

    if (mode !== 'list') {
        return (
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    {mode === 'create' ? 'Crear Nuevo Libro' : 'Editar Libro'}
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
                        name="autor"
                        value={formData.autor}
                        onChange={handleInputChange}
                        placeholder="Autor"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                        placeholder="ISBN"
                        className="p-2 mb-2 w-full border rounded"
                    />
                    <input
                        type="number"
                        name="numeroPaginas"
                        value={formData.numeroPaginas}
                        onChange={handleInputChange}
                        placeholder="Número de Páginas"
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
                        onClick={() => { setMode('list'); setFormData({ id: null, titulo: '', autor: '', isbn: '', numeroPaginas: '', fechaPublicacion: '' }); }}
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
                        <th className="p-2 border-b">Acciones</th>
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
                            <td className="p-2">
                                <button
                                    onClick={() => handleEdit(libro)}
                                    className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-1"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(libro.id)}
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
            {libros.length === 0 && !error && <p className="text-sm text-gray-500 mt-2">No hay libros disponibles.</p>}
        </div>
    );
};

export default LibroList;
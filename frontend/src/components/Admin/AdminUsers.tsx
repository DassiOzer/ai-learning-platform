import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState<string>('');
    const [editPhone, setEditPhone] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/users')
            .then(res => {
                setUsers(res.data.map((u: any) => ({
                    id: u._id,
                    name: u.name,
                    phone: u.phone
                })));
            })
            .catch(() => setError('Failed to load users'))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`/api/users/${id}`);
            setUsers(users => users.filter(u => u.id !== id));
        } catch {
            setError('Failed to delete user');
        }
    };

    const handleEdit = (id: string, name: string, phone: string) => {
        setEditId(editId === id ? null : id);
        if (editId !== id) {
            setEditName(name);
            setEditPhone(phone);
        }
    };

    const handleUpdate = async (id: string) => {
        try {
            await axios.put(`/api/users/${id}`, { name: editName, phone: editPhone });
            setUsers(users => users.map(u => (u.id === id ? { ...u, name: editName, phone: editPhone } : u)));
            setEditId(null);
        } catch {
            setError('Failed to update user');
        }
    };

    const handleCancel = () => {
        setEditId(null);
    };

    const handleHistory = (id: string) => {
        navigate(`/admin/users/${id}/history`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">All Users</h2>
            <table className="w-full border rounded shadow bg-white">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-center">Name</th>
                        <th className="p-2 text-center">Phone</th>
                        <th className="p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="border-t">
                            <td className="p-2 text-center">
                                {editId === u.id ? (
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    u.name
                                )}
                            </td>
                            <td className="p-2 text-center">
                                {editId === u.id ? (
                                    <input
                                        type="text"
                                        value={editPhone}
                                        onChange={(e) => setEditPhone(e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    u.phone
                                )}
                            </td>
                            <td className="p-2 text-center">
                                <div className="flex justify-center space-x-2">
                                    {editId === u.id ? (
                                        <>
                                            <button className="bg-green-600 text-white font-bold py-1 px-4 rounded hover:bg-green-700 transition duration-200" onClick={() => handleUpdate(u.id)}>
                                                Save
                                            </button>
                                            <button className="bg-red-600 text-white font-bold py-1 px-4 rounded hover:bg-red-700 transition duration-200" onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="text-green-600 underline" onClick={() => handleEdit(u.id, u.name, u.phone)}>
                                                Edit
                                            </button>
                                            <button className="text-red-600 underline" onClick={() => handleDelete(u.id)}>
                                                Delete
                                            </button>
                                            <button className="text-blue-600 underline">
                                                <Link to={`/admin/users/${u.id}/history`} state={{ name: u.name }}>
                                                    History
                                                </Link>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;

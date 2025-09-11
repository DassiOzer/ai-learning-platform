import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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

    const handleEdit = (id: string) => {
        navigate(`/admin/users/${id}/edit`);
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
                            <td className="p-2 text-center">{u.name}</td>
                            <td className="p-2 text-center">{u.phone}</td>
                            <td className="p-2 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button className="text-green-600 underline" onClick={() => handleEdit(u.id)}>
                                        Edit
                                    </button>
                                    <button className="text-red-600 underline" onClick={() => handleDelete(u.id)}>
                                        Delete
                                    </button>
                                    <button className="text-blue-600 underline" onClick={() => handleHistory(u.id)}>
                                        History
                                    </button>
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
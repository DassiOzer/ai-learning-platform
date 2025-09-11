import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category, SubCategory } from '../../types';
import { Prompt } from '../../types';

const History: React.FC = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        axios.get(`/api/prompts/user/${userId}`)
            .then(res => setPrompts(res.data))
            .catch(() => setPrompts([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">My Questions History</h2>
            {prompts.length === 0 ? (
                <div className="text-gray-500 text-center">No questions found.</div>
            ) : (
                <div className="space-y-6">
                    {prompts.map((item) => (
                        <div key={item._id} className="bg-white rounded shadow p-4 border">
                            <div className="mb-2 text-sm text-gray-500">
                                {typeof item.category_id === 'object' && item.category_id !== null
                                    ? item.category_id.name
                                    : item.category_id}
                                /
                                {typeof item.sub_category_id === 'object' && item.sub_category_id !== null
                                    ? item.sub_category_id.name
                                    : item.sub_category_id}
                                &middot; {new Date(item.created_at).toLocaleString()}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Q:</span> {item.prompt}
                            </div>
                            <div>
                                <span className="font-semibold text-blue-700">A:</span> {item.response}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
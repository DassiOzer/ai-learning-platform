import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Prompt } from '../../types';

const UserHistory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [history, setHistory] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/users/${id}/history`)
      .then(res => setHistory(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">{`${localStorage.getItem('user_name')} Questions History`}</h2>
      {history.length === 0 ? (
        <div className="text-gray-500 text-center">No questions found.</div>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <div key={item._id} className="bg-white border rounded shadow p-4">
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

export default UserHistory;
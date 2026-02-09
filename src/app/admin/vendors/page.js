'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, User, Trash2 } from 'lucide-react';

export default function VendorManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            if (res.ok) {
                setUsers(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleRole = async (user) => {
        const newRole = user.role === 'ARTIST' ? 'USER' : 'ARTIST';
        try {
            const res = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) {
                fetchUsers();
            }
        } catch (err) {
            alert('Failed to update role');
        }
    };

    const deleteUser = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetch(`/api/users/${id}`, { method: 'DELETE' });
            fetchUsers();
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    if (loading) return <div>Loading Vendors...</div>;

    const vendors = users.filter(u => u.role === 'ARTIST' || u.role === 'ADMIN'); // Include admins for visibility
    const customers = users.filter(u => u.role !== 'ARTIST' && u.role !== 'ADMIN');

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold mb-8">Vendor & User Management</h1>

            {/* Vendor List */}
            <div className="mb-12">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-green-600" /> Verified Artists & Admins
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map(user => (
                                <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role !== 'ADMIN' && (
                                            <button
                                                onClick={() => toggleRole(user)}
                                                className="text-amber-600 hover:underline text-sm mr-4"
                                            >
                                                Revoke Access
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer List */}
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <User className="text-gray-600" /> Customers / Applicants
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No customers found.</td>
                                </tr>
                            ) : (
                                customers.map(user => (
                                    <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{user.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs">Customer</span></td>
                                        <td className="px-6 py-4 flex gap-4">
                                            <button
                                                onClick={() => toggleRole(user)}
                                                className="text-green-600 hover:underline text-sm font-medium"
                                            >
                                                Approve as Artist
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

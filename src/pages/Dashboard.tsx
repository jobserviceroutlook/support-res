import React from 'react';
import { useAuthStore } from '../store/authStore';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.full_name}</h2>
        <p className="text-gray-600">
          This is your personal dashboard where you can manage your {user?.role === 'researcher' ? 'research requests' : 'services'}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
          <p className="text-3xl font-bold text-indigo-600">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-2">Completed Orders</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Messages</h3>
          <p className="text-3xl font-bold text-orange-600">0</p>
        </div>
      </div>
    </div>
  );
}
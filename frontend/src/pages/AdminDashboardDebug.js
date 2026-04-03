import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboardDebug = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 AdminDashboardDebug mounted');
    console.log('👤 User:', user);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      console.log('✅ Loading complete');
    }, 1000);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading Admin Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard (Debug)</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
              <p className="text-xs text-gray-400">Email: {user?.email} | Role: {user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Debug Information</h2>
            <div className="space-y-2">
              <p><strong>User Object:</strong></p>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
              <p><strong>Component Status:</strong> ✅ Working</p>
              <p><strong>Next Step:</strong> Test API calls</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardDebug;

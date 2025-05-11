import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../createClient';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">Admin User</span>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-[#646cff] hover:bg-[#535bf2] rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-[#222222] p-6 rounded-2xl shadow-xl border border-[#333333] mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
        <p className="text-gray-300">
          Manage your portfolio efficiently. Choose a quick action below to get started.
        </p>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/admin/about')}
          className="bg-[#2a2a2a] p-6 rounded-2xl shadow-md border border-[#333333] hover:bg-[#333333] cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold mb-2">Edit About</h3>
          <p className="text-gray-300">Update your personal info and tech stack.</p>
        </div>
        <div
          onClick={() => navigate('/admin/projects')}
          className="bg-[#2a2a2a] p-6 rounded-2xl shadow-md border border-[#333333] hover:bg-[#333333] cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold mb-2">Manage Projects</h3>
          <p className="text-gray-300">Add or edit your project portfolio.</p>
        </div>
        <div
          onClick={() => navigate('/admin/settings')}
          className="bg-[#2a2a2a] p-6 rounded-2xl shadow-md border border-[#333333] hover:bg-[#333333] cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold mb-2">Settings</h3>
          <p className="text-gray-300">Configure account and site settings.</p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
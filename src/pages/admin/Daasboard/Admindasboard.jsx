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
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="text-gray-300">Admin User</span>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-[#646cff] hover:bg-[#535bf2] rounded-lg transition w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-[#222222] p-4 md:p-6 rounded-2xl shadow-xl border border-[#333333] mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Welcome, Admin!</h2>
        <p className="text-gray-300 text-sm md:text-base">
          Manage your portfolio efficiently from the sidebar.
        </p>
      </section>
    </div>
  );
};

export default AdminDashboard;
  
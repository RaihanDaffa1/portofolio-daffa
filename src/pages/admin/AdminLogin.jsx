import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../createClient';

const AdminLogin = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
setLoading(true);
setError(null);

const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
});

if (error) {
    setError(error.message);
    setLoading(false);
} else {
    navigate('/Admin');
}
};

return (
<div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
    <div className="bg-[#222222] p-8 rounded-2xl shadow-xl border border-[#333333] w-full max-w-md">
    <h2 className="text-3xl font-bold text-white mb-6 text-center">Login Admin</h2>
    <form onSubmit={handleLogin} className="space-y-6">
        <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            className="w-full p-3 bg-[#2a2a2a] text-white border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#646cff] transition"
            required
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Kata Sandi</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan kata sandi"
            className="w-full p-3 bg-[#2a2a2a] text-white border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#646cff] transition"
            required
        />
        </div>
        {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
            ? 'bg-[#535bf2] opacity-50 cursor-not-allowed'
            : 'bg-[#646cff] hover:bg-[#535bf2]'
        }`}
        >
        {loading ? 'Memuat...' : 'Masuk'}
        </button>
    </form>
    </div>
</div>
);
};

export default AdminLogin;
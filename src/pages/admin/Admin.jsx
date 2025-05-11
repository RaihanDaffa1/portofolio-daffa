import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminsidebar from '../../components/Adminsidebar';
import { Outlet } from 'react-router-dom';
import { supabase } from '../../createClient';

const Admin = () => {
const navigate = useNavigate();

useEffect(() => {
const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
    navigate('/login');
    }
};
checkUser();
}, [navigate]);

return (
<div className="flex flex-row min-h-screen bg-[#1a1a1a]">
    <Adminsidebar />
    <main className="flex-grow p-4">
    <Outlet />
    </main>
</div>
);
};

export default Admin;
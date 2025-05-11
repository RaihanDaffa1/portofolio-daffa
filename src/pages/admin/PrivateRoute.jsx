import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../createClient';

const PrivateRoute = ({ children }) => {
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setLoading(false);
};
checkSession();
}, []);

if (loading) return <div>Loading...</div>;

return session ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
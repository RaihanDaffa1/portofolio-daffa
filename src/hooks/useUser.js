import { useEffect, useState } from 'react';
import { supabase } from '../createClient';

export default function useUser() {
const [user, setUser] = useState(null);

useEffect(() => {
const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user);
};
getUser();
}, []);

return user;
}

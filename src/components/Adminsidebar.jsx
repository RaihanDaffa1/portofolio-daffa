import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FiBarChart, FiChevronsRight, FiHome, FiMonitor, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../createClient";

const Adminsidebar = () => {
const [open, setOpen] = useState(true);
const [selected, setSelected] = useState("Dashboard");

return (
<motion.nav
    layout
    className="sticky top-0 h-screen shrink-0 border-r border-gray-700 bg-[#1A1B1F] p-2 rounded-br-xl rounded-tr-xl flex flex-col gap-[30dvh]"
    style={{
    width: open ? "225px" : "fit-content",
    }}
>
    <TitleSection open={open} />

    <div className="space-y-1">
    <Option
        Icon={FiHome}
        title="Dashboard"
        selected={selected}
        setSelected={setSelected}
        open={open}
    />
    <Option
        Icon={FiMonitor}
        title="Hero"
        selected={selected}
        setSelected={setSelected}
        open={open}
    />
    <Option
        Icon={FiMonitor}
        title="About"
        selected={selected}
        setSelected={setSelected}
        open={open}
    />
    <Option
        Icon={FiBarChart}
        title="Certificates"
        selected={selected}
        setSelected={setSelected}
        open={open}
    />
    </div>

    <ToggleClose open={open} setOpen={setOpen} />
</motion.nav>
);
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
const navigate = useNavigate();

const handleClick = () => {
setSelected(title);
// Jika title adalah "Dashboard", arahkan ke /Admin, jika tidak, ke /Admin/{title}
if (title === "Dashboard") {
    navigate(`/Admin`);
} else {
    navigate(`/Admin/${title}`);
}
};

return (
<motion.button
    layout
    onClick={handleClick}
    className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
    selected === title
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`}
>
    <motion.div layout className="grid h-full w-10 place-content-center text-lg">
    <Icon />
    </motion.div>
    {open && (
    <motion.span
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125 }}
        className="text-sm font-medium"
    >
        {title}
    </motion.span>
    )}
    {notifs && open && (
    <motion.span
        layout
        className="absolute right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1"
    >
        {notifs}
    </motion.span>
    )}
</motion.button>
);
};

const TitleSection = ({ open }) => {
const [user, setUser] = useState(null);

useEffect(() => {
fetchUser();
}, []);

async function fetchUser() {
const { data: { user }, error } = await supabase.auth.getUser();
if (error) {
    console.error("Error fetching user:", error);
} else {
    setUser(user);
}
}

return (
<div className="mb-3 border-b border-gray-700 pb-3">
    <div className="group flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-gray-700">
    {open && (
        <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125 }}
        >
        <span className="block text-sm text-gray-300">
            Halo, {user?.user_metadata?.firstname || "Admin"}
        </span>
        </motion.div>
    )}
    </div>
</div>
);
};

const ToggleClose = ({ open, setOpen }) => {
return (
<motion.button
    layout
    onClick={() => setOpen((pv) => !pv)}
    className="absolute bottom-0 left-0 right-0 border-t border-gray-700 transition-colors hover:bg-gray-700 rounded-br-xl"
>
    <div className="flex items-center p-2 text-gray-300 hover:text-white">
    <motion.div layout className="grid size-10 place-content-center text-lg">
        <FiChevronsRight className={`transition-transform ${open && "rotate-180"}`} />
    </motion.div>
    {open && (
        <motion.span
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125 }}
        className="text-sm font-medium"
        >
        Sembunyikan
        </motion.span>
    )}
    </div>
</motion.button>
);
};

export default Adminsidebar;
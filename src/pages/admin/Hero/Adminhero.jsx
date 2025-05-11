  import { useEffect, useState } from "react";
  import { supabase } from "../../../createClient";

  export default function HeroAdmin() {
    const [heroes, setHeroes] = useState([]);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({ greetings: "", title: "" });

    // Fetch data
    const fetchHero = async () => {
      const { data, error } = await supabase.from("tbl_hero").select("*");
      if (!error) setHeroes(data);
    };

    useEffect(() => {
      fetchHero();
    }, []);

    // Form change
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Create
    const handleCreate = async () => {
      const { error } = await supabase
        .from("tbl_hero")
        .insert([{ greetings: form.greetings, title: form.title }]);
      if (!error) {
        fetchHero();
        setForm({ greetings: "", title: "" });
      }
    };

    // Edit
    const handleEdit = (data) => {
      setEditData(data);
      setForm({ greetings: data.greetings, title: data.title });
    };

    // Update
    const handleUpdate = async () => {
      const { error } = await supabase
        .from("tbl_hero")
        .update({ greetings: form.greetings, title: form.title })
        .eq("id", editData.id);
      if (!error) {
        fetchHero();
        setEditData(null);
        setForm({ greetings: "", title: "" });
      }
    };

    // Delete
    const handleDelete = async (id) => {
      const { error } = await supabase.from("tbl_hero").delete().eq("id", id);
      if (!error) {
        fetchHero();
      }
    };

    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Hero Section (Admin)</h1>

        {/* TABLE */}
        <table className="w-full table-auto text-sm mb-6">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">Greetings</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {heroes.map((h) => (
              <tr key={h.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{h.greetings}</td>
                <td className="px-4 py-2">{h.title}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(h)}
                    className="text-yellow-400 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(h.id)}
                    className="text-red-400 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FORM */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">
            {editData ? "Edit Hero" : "Tambah Hero Baru"}
          </h2>
          <div className="mb-4">
            <label>Greetings</label>
            <input
              name="greetings"
              value={form.greetings}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded bg-gray-900 border border-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded bg-gray-900 border border-gray-700 text-white"
            />
          </div>
          <div>
            {editData ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mr-2"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={() => {
                    setEditData(null);
                    setForm({ greetings: "", title: "" });
                  }}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Tambah Hero
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

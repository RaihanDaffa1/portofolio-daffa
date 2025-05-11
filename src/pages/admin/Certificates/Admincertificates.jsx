import { useEffect, useState } from "react";
import { supabase } from "../../../createClient";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState({
    award: "",
    project: "",
    image: "",
    driveLink: "",
  });
  const [editId, setEditId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsAuthenticated(false);
        alert("Pengguna belum login. Silakan login terlebih dahulu.");
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from("tbl_certificates")
      .select("*")
      .order("id", { ascending: true });

    if (data) {
      setCertificates(data);
    } else if (error) {
      alert(`Gagal mengambil data sertifikat: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      alert("Format gambar harus JPG, JPEG, atau PNG.");
      return;
    }

    if (file.size > maxSize) {
      alert("Ukuran gambar maksimum 2MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.award || !form.project) {
      alert("Nama Penghargaan dan Nama Proyek wajib diisi!");
      return;
    }

    if (!isAuthenticated) {
      alert("Pengguna belum login. Silakan login terlebih dahulu.");
      return;
    }

    try {
      setUploading(true);
      let imageUrl = form.image || null;

      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data, error } = await supabase.storage
          .from("certificate-images")
          .upload(fileName, imageFile);

        if (error) {
          throw new Error("Gagal mengunggah gambar: " + error.message);
        }

        const { data: urlData } = supabase.storage
          .from("certificate-images")
          .getPublicUrl(fileName);

        if (!urlData?.publicUrl) {
          throw new Error("Gagal mendapatkan URL gambar publik.");
        }

        imageUrl = urlData.publicUrl;
      }

      const payload = {
        award: form.award,
        project: form.project,
        image: imageUrl,
        drive_link: form.driveLink,
      };

      let result;
      if (editId) {
        result = await supabase.from("tbl_certificates").update(payload).eq("id", editId);
      } else {
        result = await supabase.from("tbl_certificates").insert(payload);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      alert(editId ? "Sertifikat berhasil diperbarui!" : "Sertifikat berhasil ditambahkan!");
      setForm({ award: "", project: "", image: "", driveLink: "" });
      setImageFile(null);
      setImagePreview("");
      setEditId(null);
      fetchCertificates();
    } catch (error) {
      alert("Kesalahan saat submit: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (cert) => {
    setForm({
      award: cert.award,
      project: cert.project,
      image: cert.image || "",
      driveLink: cert.drive_link || "",
    });
    setImagePreview(cert.image || "");
    setImageFile(null);
    setEditId(cert.id);
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      alert("Pengguna belum login. Silakan login terlebih dahulu.");
      return;
    }

    const cert = certificates.find((c) => c.id === id);
    if (cert.image) {
      const fileName = cert.image.split("/").pop();
      await supabase.storage.from("certificate-images").remove([fileName]);
    }

    const { error } = await supabase.from("tbl_certificates").delete().eq("id", id);

    if (!error) {
      alert("Sertifikat berhasil dihapus!");
      fetchCertificates();
    } else {
      alert(`Gagal menghapus sertifikat: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-[#1a1a1a] rounded-2xl shadow-xl border border-[#333333]">
      <h2 className="text-3xl font-bold text-white mb-6">Kelola Sertifikat</h2>

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nama Penghargaan</label>
          <input
            type="text"
            name="award"
            value={form.award}
            onChange={handleChange}
            className="w-full p-3 bg-[#2a2a2a] text-white border border-[#444444] rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nama Proyek</label>
          <input
            type="text"
            name="project"
            value={form.project}
            onChange={handleChange}
            className="w-full p-3 bg-[#2a2a2a] text-white border border-[#444444] rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Unggah Gambar Sertifikat</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 bg-[#2a2a2a] text-white border border-[#444444] rounded-lg"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-2">Pratinjau Gambar:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-contain border border-[#444] rounded-lg"
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/32";
              }}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Link Google Drive</label>
          <input
            type="text"
            name="driveLink"
            value={form.driveLink}
            onChange={handleChange}
            className="w-full p-3 bg-[#2a2a2a] text-white border border-[#444444] rounded-lg"
          />
        </div>

        <button
          type="submit"
          className={`w-full font-semibold py-3 rounded-lg transition duration-300 ${
            uploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#646cff] hover:bg-[#535bf2] text-white"
          }`}
          disabled={uploading}
        >
          {uploading
            ? "Mengunggah..."
            : editId
            ? "Perbarui Sertifikat"
            : "Tambah Sertifikat"}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-300 mb-4">Daftar Sertifikat</h3>
        {certificates.length === 0 ? (
          <p className="text-gray-400">Belum ada sertifikat.</p>
        ) : (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex justify-between items-center p-4 bg-[#2a2a2a] rounded-lg border border-[#444444]"
            >
              <div className="flex items-center gap-4">
                {cert.image && (
                  <img
                    src={cert.image}
                    alt={cert.award}
                    className="w-16 h-16 object-contain rounded-lg border border-[#444444] bg-[#2a2a2a] p-2"
                  />
                )}
                <div>
                  <p className="text-white font-medium">Penghargaan: {cert.award}</p>
                  <p className="text-white font-medium">Proyek: {cert.project}</p>
                  {cert.image && (
                    <p className="text-gray-400">
                      <span className="font-medium">Gambar: </span>
                      <a href={cert.image} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                        Lihat
                      </a>
                    </p>
                  )}
                  {cert.drive_link && (
                    <p className="text-gray-400">
                      <span className="font-medium">Drive: </span>
                      <a href={cert.drive_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                        Buka
                      </a>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cert)}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

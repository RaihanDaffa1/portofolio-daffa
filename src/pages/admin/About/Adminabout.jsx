import React, { useEffect, useState } from "react";
import { supabase } from "../../../createClient";

const AboutAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    aboutme: "",
    techstackdesc: "",
    techstack_images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [aboutId, setAboutId] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const { data, error } = await supabase.from("tbl_about").select("*").single();
    if (error) {
      console.error("Error fetching about:", error.message);
      return;
    }
    setForm({
      name: data.name || "",
      aboutme: data.aboutme || "",
      techstackdesc: data.techstackdesc || "",
      techstack_images: data.techstack_images || [],
    });
    setImagePreviews(data.techstack_images || []);
    setAboutId(data.id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const sanitizeFileName = (name) => {
    return name.replace(/[^a-z0-9_\-\.]/gi, "_");
  };

  const getFileNameFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1].split("?")[0];
  };

  const handleRemoveImage = async (indexToRemove) => {
    const confirmed = window.confirm("Yakin ingin menghapus gambar ini?");
    if (!confirmed) return;

    const imageUrl = form.techstack_images[indexToRemove];
    const fileName = getFileNameFromUrl(imageUrl);

    const { error: deleteError } = await supabase.storage
      .from("techstack-images")
      .remove([fileName]);

    if (deleteError) {
      console.error("Gagal menghapus dari storage:", deleteError.message);
      alert("Gagal menghapus gambar.");
      return;
    }

    const updatedImages = form.techstack_images.filter((_, i) => i !== indexToRemove);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== indexToRemove);

    const { error: updateError } = await supabase
      .from("tbl_about")
      .update({ techstack_images: updatedImages })
      .eq("id", aboutId);

    if (updateError) {
      console.error("Gagal update database:", updateError.message);
      alert("Gagal mengupdate data.");
      return;
    }

    setForm({ ...form, techstack_images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImageUrls = [];

      for (const file of imageFiles) {
        const sanitizedFileName = `${Date.now()}_${sanitizeFileName(file.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("techstack-images")
          .upload(sanitizedFileName, file, {
            upsert: true,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          alert("Upload gagal.");
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("techstack-images")
          .getPublicUrl(sanitizedFileName);

        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      const updatedImages = [...form.techstack_images, ...uploadedImageUrls];

      const { error: updateError } = await supabase
        .from("tbl_about")
        .update({
          name: form.name,
          aboutme: form.aboutme,
          techstackdesc: form.techstackdesc,
          techstack_images: updatedImages,
        })
        .eq("id", aboutId);

      if (updateError) {
        console.error("Update error:", updateError.message);
        alert("Gagal update data.");
        return;
      }

      alert("Berhasil update!");
      setForm({ ...form, techstack_images: updatedImages });
      setImageFiles([]);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">About Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">About Me</label>
          <textarea
            name="aboutme"
            value={form.aboutme}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Tech Stack Description</label>
          <textarea
            name="techstackdesc"
            value={form.techstackdesc}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Tech Stack Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block mt-1 text-white"
          />
        </div>

        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover border border-gray-600 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                  title="Hapus gambar"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default AboutAdmin;

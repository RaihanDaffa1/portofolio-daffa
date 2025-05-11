import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../createClient";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase
        .from("tbl_certificates")
        .select("*")
        .order("id", { ascending: true });

      if (data) {
        console.log("Data sertifikat dari Supabase (Certificates):", data);
        setCertificates(data);
      } else if (error) {
        console.error("Gagal mengambil data sertifikat:", error.message);
      }
    };
    
    fetchCertificates();

    const subscription = supabase
      .channel("tbl_certificates")
      .on("postgres_changes", { event: "*", schema: "public", table: "tbl_certificates" }, () => {
        fetchCertificates();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const renderAnimatedText = (text) => (
    <div className="overflow-hidden w-full">
      <p className="whitespace-nowrap">{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 sm:px-10 sm:py-20 flex flex-col gap-12" id="certificates">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="head-text text-4xl sm:text-5xl font-bold relative">My Certificates</h1>
        <p className="mt-6 italic text-white/70 text-sm">& I win awards sometimes</p>
      </motion.div>

      <div className="w-full md:w-2/3 mx-auto">
        <div className="grid grid-cols-2 font-semibold border-b border-white/30 pb-2 uppercase text-base md:text-lg tracking-wide">
          <p>Award</p>
          <p className="text-right">Project</p>
        </div>

        {certificates.map((item, index) => (
          <Tilt
            key={index}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#00ffff"
            glarePosition="all"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
          >
            <motion.div
              className={`grid grid-cols-2 py-3 border-b border-white/20 cursor-pointer text-base md:text-lg transition duration-300 ${
                hoveredIndex === index ? "text-cyan-300 bg-white/10 shadow-lg" : ""
              }`}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedAward(item)}
            >
              <div className="overflow-hidden font-medium">
                {hoveredIndex === index ? renderAnimatedText(item.award) : <p>{item.award}</p>}
              </div>
              <div className="overflow-hidden text-right font-medium">
                {hoveredIndex === index ? renderAnimatedText(item.project) : <p>{item.project}</p>}
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAward(null)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto relative text-black shadow-2xl"
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-4 text-3xl font-bold text-gray-500 hover:text-black"
                onClick={() => setSelectedAward(null)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedAward.project}</h2>
              <img
                src={selectedAward.image}
                alt={selectedAward.project}
                className="w-full h-auto rounded-lg mb-4"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error(`Gambar gagal dimuat: ${selectedAward.image}`);
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <a
                href={selectedAward.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                View on Google Drive
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
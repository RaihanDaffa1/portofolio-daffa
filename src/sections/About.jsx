import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from('tbl_about')
        .select('*')
        .limit(1)
        .single();
        setImagePreviews(data.techstack_images || []);
      if (error) {
        console.error('Error fetching about data:', error);
      } else {
        setAboutData(data);
      }
    };  

    fetchAbout();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('raihandaffa@gmail.com');
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full">

        {/* Grid 1 - Intro */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}    
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <div className="grid-container h-full">
            <img src="assets/me.png" alt="grid-1" className="w-full h-48 object-contain" />
            <div>
              <p className="grid-headtext">{aboutData?.name || 'Loading...'}</p>
              <p className="grid-subtext">{aboutData?.aboutme || 'Loading about me...'}</p>
            </div>
          </div>
        </motion.div>

        {/* Grid 2 - Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <div className="grid-container h-full">
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext mb-6">
                {aboutData?.techstackdesc || 'Loading tech stack description...'}
              </p>
              <div className="flex flex-wrap gap-4">
        {imagePreviews.map((img, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-lg overflow-hidden shadow-md border border-[#444444] bg-[#2a2a2a]"
          >
            <img
              src={img}
              alt={`techstack-${i}`}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                console.error(`Gambar gagal dimuat: ${img}`);
                e.target.src = "https://via.placeholder.com/16"; // Fallback online
              }}
            />
          </div>
        ))}
      </div>
            </div>
          </div>
        </motion.div>


          {/* Grid 3 - Timeline Experience */}
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <div className="grid-container h-full">
            <div className="w-full h-64 bg-[#111111] rounded-lg p-4 flex flex-col">
              <p className="grid-headtext mb-2">My Journey</p>
              <p className="grid-subtext mb-4">A timeline of my coding experience and milestones.</p>
              {/* Timeline Component */}
              <div className="relative w-full flex flex-col justify-center flex-grow">
                {/* Timeline Line */}
                <div className="absolute left-0 right-0 h-[2px] bg-[#444444] top-1/2 transform -translate-y-1/2"></div>
                
                {/* Timeline Nodes */}
                <div className="relative flex justify-between items-center px-4 py-1">
                  {/* Node 1 - 2023 */}
                  <div className="flex flex-col items-center z-10">
                    <div className="text-white text-xs mb-0.5">2023</div>
                    <div className="relative">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#333333] border-[1.5px] border-[#8a8a8a] flex items-center justify-center">
                        <div className="w-[8px] h-[8px] rounded-full bg-transparent"></div>
                      </div>
                    </div>
                    <div className="text-[#8a8a8a] text-[10px] mt-0.5">Mulai Belajar</div>
                  </div>
                  
                  {/* Node 2 - 2024 */}
                  <div className="flex flex-col items-center z-10">
                    <div className="text-white text-xs mb-0.5">2024</div>
                    <div className="relative">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#333333] border-[1.5px] border-[#8a8a8a] flex items-center justify-center">
                        <div className="w-[8px] h-[8px] rounded-full bg-transparent"></div>
                      </div>
                    </div>
                    <div className="text-[#8a8a8a] text-[10px] mt-0.5">Proyek Pertama</div>
                  </div>
                  
                  {/* Node 3 - 2025 (Active) */}
                  <div className="flex flex-col items-center z-10">
                    <div className="text-white text-xs mb-0.5">2025</div>
                    <div className="relative">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#333333] border-[1.5px] border-[#8a8a8a] flex items-center justify-center">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#646cff]"></div>
                      </div>
                    </div>
                    <div className="text-[#8a8a8a] text-[10px] mt-0.5">1 Tahun</div>
                  </div>
                  
                  {/* Node 4 - Future */}
                  <div className="flex flex-col items-center z-10">
                    <div className="text-white text-xs mb-0.5">Future</div>
                    <div className="relative">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#333333] border-[1.5px] border-[#8a8a8a] flex items-center justify-center">
                        <div className="w-[8px] h-[8px] rounded-full bg-transparent"></div>
                      </div>
                    </div>
                    <div className="text-[#8a8a8a] text-[10px] mt-0.5">Full Stack</div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </motion.div>


        {/* Grid 4 - Passion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:col-span-2 h-full"
        >
          <div className="grid-container h-full">
            <img src="assets/grid3.png" alt="grid-3" className="w-full h-48 object-contain" />
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn't just my profession—it's my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grid 5 - Globe */}
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full"
          >
          <div className="grid-container h-full">
            <div className="rounded-3xl w-full h-48 flex justify-center items-center">
              <Globe
                height={192}
                width={192}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 40, lng: -100, text: 'SMKN 1 CIOMAS', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">I'm very flexible with time zone communications & locations</p>
              <p className="grid-subtext">I'm based in Rjieka, Croatia and open to remote work worldwide.</p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full mt-6 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition"
              >
                Contact Me
              </button>
            </div>
          </div>
          </motion.div>
      
      </div>
    </section>
  );
};

export default About;
const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
  <a href="https://github.com/RaihanDaffa1" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#1e1e1e] hover:scale-110 transition-transform duration-300">
    <img src="/assets/github.svg" alt="github" className="w-6 h-6" />
  </a>
  <a href="https://www.instagram.com/r.daffaaa/profilecard/?igsh=MWo1c3Vha3RnMGN5MQ%3D%3D" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#1e1e1e] hover:scale-110 transition-transform duration-300">
    <img src="/assets/instagram.svg" alt="instagram" className="w-6 h-6" />
  </a>
</div>

      <p className="text-white-500">© 2025 Raihan Daffa. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

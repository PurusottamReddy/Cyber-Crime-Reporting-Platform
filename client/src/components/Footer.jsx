import React from 'react';

const Footer = () => {
  return (
    <footer className="relative border-t border-cyan-400/30 bg-gray-900/80 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-cyan-400 font-bold text-xl">
            CyberLens
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors text-2xl hover:scale-125 transform duration-300 hover:drop-shadow-[0_0_10px_rgba(64,224,208,0.5)]">📘</a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors text-2xl hover:scale-125 transform duration-300 hover:drop-shadow-[0_0_10px_rgba(64,224,208,0.5)]">🐦</a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors text-2xl hover:scale-125 transform duration-300 hover:drop-shadow-[0_0_10px_rgba(64,224,208,0.5)]">💼</a>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CyberLens. All rights reserved.
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">Privacy Policy</a> | 
            <a href="#" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

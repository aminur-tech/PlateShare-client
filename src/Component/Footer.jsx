import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-gray-300 px-6 py-10 ">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Logo and Name */}
        <div className="flex flex-col items-center">
          <img
            src="https://i.ibb.co.com/HL8J61bT/Plate-Share-removebg-preview.png"
            alt="PlateShare Logo"
            className="w-14 h-14 rounded-full mb-2 shadow-md"
          />
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            PlateShare
          </h2>
        </div>

        {/* Social Links */}
        <div className="flex gap-5 text-2xl">
          {[
            { icon: <FaFacebook />, link: "https://facebook.com" },
            { icon: <FaInstagram />, link: "https://instagram.com" },
            { icon: <FaXTwitter />, link: "https://twitter.com" },
            { icon: <FaGithub />, link: "https://github.com" },
            { icon: <FaLinkedin />, link: "https://linkedin.com" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-[2px] bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>

        {/* Footer Text */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="text-orange-400 font-semibold">PlateShare</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

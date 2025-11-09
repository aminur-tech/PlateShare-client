import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content px-6 py-10 mt-16">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
                
                {/* Logo and Name */}
                <div className="flex flex-col items-center">
                    <img 
                        src="https://i.ibb.co.com/HL8J61bT/Plate-Share-removebg-preview.png" 
                        alt="PlateShare Logo" 
                        className="w-12 h-12 rounded-full mb-2" 
                    />
                    <h2 className="text-2xl font-semibold text-primary">PlateShare</h2>
                </div>

                {/* Social Links */}
                <div className="flex gap-5 text-2xl justify-center">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <FaGithub />
                    </a>
                </div>

                {/* Footer Text */}
                <div className="text-sm text-gray-600">
                    © {new Date().getFullYear()} PlateShare. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

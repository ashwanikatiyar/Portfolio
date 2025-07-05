
"use client";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-6 sm:py-10 px-4 border-t border-gray-700 font-[ITC]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Contact</h2>
          <p className="mb-2 flex items-center gap-2">
            <FaEnvelope />
            <a href="mailto:your.email@example.com" className="hover:underline">
              ashwanikats@gmail.com
            </a>
          </p>
          <p className="mb-2 flex items-center gap-2 sm:items-center">
            <FaPhone />
            +91-85XXXXXXXX
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Follow Me</h2>
          <div className="flex flex-wrap gap-4 text-2xl">
            <a
              href="https://github.com/ashwanikatiyar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ashwani-sde/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/ashwani.katiyar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/ash.___b26/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Portfolio Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">About Me</h2>
          <p className="text-sm sm:text-base">
            Hi there! I'm a full-stack developer passionate about building clean,
            user-centric web experiences. Reach out if you'd like to collaborate
            or have a project in mind!
          </p>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ashwani Katiyar. All rights reserved.
      </div>
    </footer>
  );
}

"use client";

import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative min-h-[40vh] flex items-center justify-center px-4 py-6 z-10">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Contact</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/samuel-baumgartner-441a1a24b/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[200px]"
          >
            <svg
              className="w-12 h-12 text-[#0077b5] group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-gray-900 font-semibold text-lg">LinkedIn</span>
            <span className="text-gray-600 text-sm text-center">Connect with me</span>
          </a>

          {/* Email */}
          <a
            href="mailto:sbaumgartn@ethz.ch"
            className="group flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[200px]"
          >
            <svg
              className="w-12 h-12 text-gray-700 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-900 font-semibold text-lg">Email</span>
            <span className="text-gray-600 text-sm text-center break-all">sbaumgartn@ethz.ch</span>
          </a>
        </div>
      </div>
    </section>
  );
}

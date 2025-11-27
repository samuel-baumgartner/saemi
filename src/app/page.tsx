"use client";

import Link from "next/link";
import React, { useState } from "react";
import Typewriter from "@/components/Typewriter";
import ScrollBackground from "@/components/ScrollBackground";
import ScrollHint from "@/components/ScrollHint";
import EducationModal from "@/components/EducationModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalImages, setModalImages] = useState<string[] | undefined>(undefined);
  const [modalCarouselItems, setModalCarouselItems] = useState<Array<{type: 'image' | 'video', src: string}> | undefined>(undefined);
  const [modalContent, setModalContent] = useState<React.ReactNode | undefined>(undefined);
  const [modalHeaderContent, setModalHeaderContent] = useState<React.ReactNode | undefined>(undefined);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  const openModal = (
    title: string,
    description: string,
    images?: string[],
    content?: React.ReactNode,
    headerContent?: React.ReactNode,
    carouselItems?: Array<{type: 'image' | 'video', src: string}>
  ) => {
    setModalTitle(title);
    setModalDescription(description);
    setModalImages(images);
    setModalContent(content);
    setModalHeaderContent(headerContent);
    setModalCarouselItems(carouselItems);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ScrollBackground />
      <main className="relative min-h-screen">
        <div className="flex min-h-screen items-center justify-center relative">
          <Link
            href="/"
            className="absolute top-4 left-4 text-white text-lg font-medium hover:underline z-10"
          >
            Samuel Baumgartner
          </Link>
          <div className="text-center text-white space-y-8 max-w-2xl px-4 z-10">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                Samuel Baumgartner
              </h1>
              <p className="text-xl md:text-2xl text-white font-light">
                BSc Electrical Engineering,{" "}
                <a
                  href="https://ethz.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-normal hover:underline"
                >
                  ETH Zürich
                </a>
              </p>
            </div>
            <p className="text-lg text-white pt-4">
              I am a <Typewriter />
            </p>
            <p className="text-lg text-white">
              Interested in robotics, control, and embedded systems.
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <Link
                href="#cv"
                className="text-sm text-white hover:text-gray-200 transition-colors"
              >
                CV
              </Link>
              <Link
                href="#projects"
                className="text-sm text-white hover:text-gray-200 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="text-sm text-white hover:text-gray-200 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <ScrollHint />
        </div>
        
        {/* About Me Section */}
        <section id="about" className="relative flex items-center justify-center px-4 py-20 z-10">
          <div className="max-w-6xl w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">About</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-6 text-white text-lg leading-relaxed">
                  <p>
                    I am a third-year Bachelor's student in Electrical Engineering at ETH Zurich with a strong interest in robotics, software development, and control systems.
                  </p>
                  <p>
                    I work as a teaching assistant at ETH and am actively pursuing projects in SaaS development to gain practical entrepreneurial experience.
                  </p>
                  <p>
                    Outside of academics, I study Japanese, take care of my bees, and go to the gym, combining curiosity and creativity in both personal and professional pursuits.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center relative z-20">
                <div
                  className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-700 flex items-center justify-center"
                  onMouseEnter={() => setIsPortraitHovered(true)}
                  onMouseLeave={() => setIsPortraitHovered(false)}
                >
                  <img
                    src="/Portrait.png"
                    alt="Samuel Baumgartner"
                    className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 ease-out"
                    style={{
                      transform: isPortraitHovered ? "scale(1.15)" : "scale(1.05)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="relative flex items-center justify-center px-4 py-12 z-10">
          <div className="max-w-6xl w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Education</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Gymnasium Oberwil */}
              <button
                onClick={() =>
                  openModal(
                    "Gymnasium Oberwil",
                    "I completed my Matura at Gymnasium Oberwil, where I focused on mathematics and physics. These subjects shaped the way I think about engineering: abstract structures, rigorous problem-solving, and logically dissecting complex systems. During these years I discovered my interest in building and understanding mechanisms — the foundation that led me toward electrical engineering and robotics."
                  )
                }
                className="bg-gray-200 hover:bg-gray-400 rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Gymnasium Oberwil
                </h3>
                <p className="text-gray-600">Secondary Education</p>
              </button>

              {/* Military */}
              <button
                onClick={() =>
                  openModal(
                    "Military Service",
                    "After finishing school, I completed my mandatory Swiss military service and served as a sergeant. During this time I worked in a technical role involving computers and digital systems, which gave me practical exposure to the security-critical side of modern infrastructure. While I can't share specific details of the function, the experience strengthened my discipline, leadership under pressure, and interest in resilient, secure technology — skills that continue to shape the way I approach engineering projects and teamwork."
                  )
                }
                className="bg-gray-800 hover:bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  Military Service
                </h3>
                <p className="text-gray-300">Swiss Armed Forces</p>
              </button>

              {/* ETH Electrical Engineering */}
              <button
                onClick={() =>
                  openModal(
                    "ETH Zürich",
                    "Since 2023, I have been studying Electrical Engineering at ETH Zürich. With a current average of 5.7 (top 5% of the cohort), I focus on systems and control, embedded engineering, and robotics. My goal is to pursue a Master's in Robotics, where I can combine control theory, hardware design, and intelligent systems. Alongside my studies, I work on practical engineering projects, robotics prototypes, and competitive hackathons, aiming to build systems that move beyond theory into real-world impact."
                  )
                }
                className="bg-gray-200 hover:bg-gray-400 rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ETH Electrical Engineering
                </h3>
                <p className="text-gray-600">Bachelor's Degree</p>
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
          <div className="max-w-6xl w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Projects</h2>
            
            {/* Hackathon Projects - 2 side by side */}
            <div className="mb-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Start Hack 24 - Belimo */}
                <button
                  onClick={() => {
                    const images = [
                      "/Start Hack/1.png",
                      "/Start Hack/2.png",
                      "/Start Hack/3.png",
                      "/Start Hack/4.png",
                    ];
                    const headerContent = (
                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          StartHack 2024 – Belimo Challenge | Progress Pact
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">Hackathon</span>
                          <span>St Gallen</span>
                          <span>•</span>
                          <span>March 2025</span>
                          <span>•</span>
                          <span>Team of 4</span>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          A web app to improve workplace well-being through AI coaching, gamified goal tracking, and social engagement.
                        </p>
                      </div>
                    );

                    const content = (
                      <div className="space-y-10">
                        {/* Overview */}
                        <div className="space-y-3">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                            Overview
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            Progress Pact is a prototype we built for the Belimo Challenge at StartHack 2024 (St. Gallen). The app supports employee well-being across health, nutrition, exercise, and social connection—aiming to create a happier, more productive workplace. We advanced to the finalist stage and narrowly missed winning the challenge.
                          </p>
                        </div>

                        {/* Core Concept */}
                        <div className="space-y-4 bg-gray-50 rounded-xl p-6 border border-gray-100">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
                            Core Concept
                          </h4>
                          <p className="text-gray-700 mb-3">
                            Progress Pact promotes holistic well-being through four pillars:
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                              <div>
                                <strong className="text-gray-900">Health & Exercise:</strong>
                                <span className="text-gray-700"> realistic, AI-guided routines and goals.</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                              <div>
                                <strong className="text-gray-900">Nutrition & Lifestyle:</strong>
                                <span className="text-gray-700"> tracking balance and daily habits.</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                              <div>
                                <strong className="text-gray-900">Social Interaction & Events:</strong>
                                <span className="text-gray-700"> discovering and joining activities that build community.</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                              <div>
                                <strong className="text-gray-900">Workplace Culture:</strong>
                                <span className="text-gray-700"> making well-being part of everyday company life.</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-6">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                            Key Features
                          </h4>
                          <div className="space-y-8">
                            {/* AI Coach */}
                            <div className="space-y-3">
                              <img
                                src="/Start Hack/2.png"
                                alt="AI Coach Feature"
                                className="w-full rounded-xl shadow-lg border border-gray-200"
                              />
                              <div>
                                <h5 className="text-xl font-semibold text-gray-900 mb-1">AI Coach</h5>
                                <p className="text-gray-700 leading-relaxed">
                                  Conversational coach that generates personalized fitness and wellness plans, supports goal setting, and provides motivation.
                                </p>
                              </div>
                            </div>

                            {/* SMART Goals */}
                            <div className="space-y-3">
                              <img
                                src="/Start Hack/4.png"
                                alt="SMART Goals Feature"
                                className="w-full rounded-xl shadow-lg border border-gray-200"
                              />
                              <div>
                                <h5 className="text-xl font-semibold text-gray-900 mb-1">SMART Goals</h5>
                                <p className="text-gray-700 leading-relaxed">
                                  Users create and track goals across life areas with gamified rewards and progress feedback.
                                </p>
                              </div>
                            </div>

                            {/* Multilingual Chat */}
                            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                              <h5 className="text-xl font-semibold text-gray-900 mb-1">Multilingual Chat</h5>
                              <p className="text-gray-700 leading-relaxed">
                                Built-in chat with automatic translation to enable seamless communication across teams and languages.
                              </p>
                            </div>

                            {/* Events System */}
                            <div className="space-y-3">
                              <img
                                src="/Start Hack/3.png"
                                alt="Events System Feature"
                                className="w-full rounded-xl shadow-lg border border-gray-200"
                              />
                              <div>
                                <h5 className="text-xl font-semibold text-gray-900 mb-1">Events System</h5>
                                <p className="text-gray-700 leading-relaxed">
                                  Employees can create, discover, and join company or local events with social and health incentives.
                                </p>
                              </div>
                            </div>

                            {/* 3D Avatar */}
                            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                              <h5 className="text-xl font-semibold text-gray-900 mb-1">3D Avatar</h5>
                              <p className="text-gray-700 leading-relaxed">
                                Animated Blender-based character integrated into the UI to enhance engagement.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></span>
                            Tech Stack
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                              <div>
                                <strong className="text-gray-900">Frontend/Backend:</strong>
                                <span className="text-gray-700"> Next.js (React)</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <div>
                                <strong className="text-gray-900">Database/ORM:</strong>
                                <span className="text-gray-700"> Prisma</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <div>
                                <strong className="text-gray-900">Auth:</strong>
                                <span className="text-gray-700"> NextAuth</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                              <div>
                                <strong className="text-gray-900">UI:</strong>
                                <span className="text-gray-700"> shadcn/ui</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              <div>
                                <strong className="text-gray-900">Hosting:</strong>
                                <span className="text-gray-700"> Vercel</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                              <div>
                                <strong className="text-gray-900">3D:</strong>
                                <span className="text-gray-700"> custom Blender models</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                              <div>
                                <strong className="text-gray-900">AI Coach:</strong>
                                <span className="text-gray-700"> ChatGPT with user-context integration</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Result */}
                        <div className="space-y-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                            Result
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            In 36 hours, we delivered a fully functional prototype featuring real-time chat, goal tracking, event creation, AI coaching, and a 3D animated avatar—combining AI, gamification, and workplace psychology into one cohesive platform.
                          </p>
                        </div>
                      </div>
                    );
                    openModal("", "", images, content, headerContent);
                  }}
                  className="rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left relative overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/Start Hack/1.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors"></div>
                  <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold z-10">
                    Hackathon
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 pr-16 drop-shadow-lg">
                      Start Hack 24 - Belimo
                    </h3>
                    <p className="text-white drop-shadow-md mb-2">Start Hack 24</p>
                  </div>
                </button>

                {/* Young Talents Hack */}
                <button
                  onClick={() =>
                    openModal(
                      "Young Talents Hack",
                      "First Place, 1k earnings. This project was developed during the Young Talents Hack, showcasing innovative solutions. [Add more details about the project here]"
                    )
                  }
                  className="bg-gray-800 hover:bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left relative"
                >
                  <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                    Hackathon
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 pr-16">
                    Young Talents Hack
                  </h3>
                  <p className="text-gray-300 mb-2">Young Talents Hack</p>
                  <p className="text-white font-semibold">🏆 First Place</p>
                  <p className="text-gray-200 text-sm mt-1">💰 1k earnings</p>
                </button>
              </div>

              {/* Second row of hackathon projects */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* City Planner - Nasa Space Apps Challenge */}
                <button
                  onClick={() => {
                    const carouselItems = [
                      { type: 'image' as const, src: '/Nasa Hack/1.png' },
                      { type: 'image' as const, src: '/Nasa Hack/2.png' },
                      { type: 'image' as const, src: '/Nasa Hack/3.png' },
                      { type: 'video' as const, src: 'https://www.youtube.com/watch?v=XYicrR4ybDM&t=25s' },
                    ];
                    const headerContent = (
                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          NASA Space Apps Challenge 2025 – "Data Pathways to Healthy Cities" | UrbanLens
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">Hackathon</span>
                          <span>Lucerne</span>
                          <span>•</span>
                          <span>October 2025</span>
                          <span>•</span>
                          <span>Team of 5</span>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          UrbanLens is a web platform built during the NASA Space Apps Challenge in Lucerne. We tackled the theme Data Pathways to Healthy Cities and Human Settlements by creating an interactive map of Zurich that overlays diverse environmental datasets.
                        </p>
                      </div>
                    );

                    const content = (
                      <div className="space-y-10">
                        {/* Overview */}
                        <div className="space-y-3">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                            Overview
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            UrbanLens is a web platform built during the NASA Space Apps Challenge in Lucerne. We tackled the theme Data Pathways to Healthy Cities and Human Settlements by creating an interactive map of Zurich that overlays diverse environmental datasets. We consolidated heterogeneous sources into a single pipeline, analyzed them in Python, and used unsupervised machine learning to detect urban anomalies. The results are visualized as layered, explorable insights for city-scale health and sustainability.
                          </p>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-6">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                            Key Features
                          </h4>
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <p className="text-gray-700 mb-4 font-semibold">Multi-layer environmental dashboard for Zurich, including:</p>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Surface Temperature</strong>
                                  <span className="text-gray-700"> (NASA/ESA Earthdata)</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Soil Sealing / Imperviousness</strong>
                                  <span className="text-gray-700"> (Earthdata)</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Air Pollution</strong>
                                  <span className="text-gray-700"> (OpenSense map + inverse-distance interpolation)</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Population Density</strong>
                                  <span className="text-gray-700"> (NASA datasets)</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Public Land Use</strong>
                                  <span className="text-gray-700"> (City of Zurich open data)</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Tree Cover / Vegetation</strong>
                                  <span className="text-gray-700"> (NASA data)</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Transportation Reachability Layer</strong>
                                  <span className="text-gray-700"> (travel range within 10 minutes)</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 space-y-2 text-gray-700">
                              <p>• Automated ingestion and alignment of satellite + city datasets into a unified grid</p>
                              <p>• Unsupervised anomaly detection to identify unusual environmental patterns</p>
                              <p>• Interactive web map to explore anomalies and underlying layers spatially</p>
                            </div>
                          </div>
                        </div>

                        {/* My Role */}
                        <div className="space-y-3 bg-blue-50 rounded-xl p-6 border border-blue-100">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                            My Role
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            I built the Python API, ran the entire analysis pipeline in Jupyter Notebook, and implemented the transportation data layer that computes and visualizes 10-minute travel reachability across the city.
                          </p>
                        </div>

                        {/* Public Transport */}
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></span>
                            Public Transport
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base mb-4">
                            I retrieved public transport data from an external API and used it to compute the area that can be reached within 10 minutes from any given point. Based on this reachable region, I then calculated a transport-accessibility score for every location on the map, reflecting how well each area is served by public transport.
                          </p>
                          <img
                            src="/Nasa Hack/3.png"
                            alt="Public Transport"
                            className="w-full rounded-xl shadow-lg border border-gray-200"
                          />
                        </div>

                        {/* Project Video */}
                        <div className="space-y-3">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></span>
                            Project Video
                          </h4>
                          <div className="w-full aspect-video rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <iframe
                              src="https://www.youtube.com/embed/XYicrR4ybDM?start=25"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="UrbanLens Project Video"
                            />
                          </div>
                        </div>

                        {/* Challenges Overcome */}
                        <div className="space-y-4 bg-orange-50 rounded-xl p-6 border border-orange-100">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                            Challenges Overcome
                          </h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-orange-500 mt-1">•</span>
                              <span><strong>Heterogeneous data formats:</strong> merged sources with different projections, resolutions, and grids into a single aligned dataset</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-orange-500 mt-1">•</span>
                              <span><strong>No labeled ground truth:</strong> designed a robust unsupervised pipeline to surface meaningful urban anomalies</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-orange-500 mt-1">•</span>
                              <span><strong>Real-time visualization:</strong> ensured the frontend could render multiple heavy geospatial layers smoothly</span>
                            </li>
                          </ul>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></span>
                            Tech Stack
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                              <div>
                                <strong className="text-gray-900">Frontend:</strong>
                                <span className="text-gray-700"> React, Next.js</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <div>
                                <strong className="text-gray-900">Backend:</strong>
                                <span className="text-gray-700"> Python (FastAPI)</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <div>
                                <strong className="text-gray-900">Data/ML:</strong>
                                <span className="text-gray-700"> Jupyter Notebook, scikit-learn (Isolation Forest)</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                              <div>
                                <strong className="text-gray-900">Geospatial:</strong>
                                <span className="text-gray-700"> GeoPandas, Rasterio</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              <div>
                                <strong className="text-gray-900">Deployment:</strong>
                                <span className="text-gray-700"> Vercel</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Live Demo */}
                        <div className="space-y-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                            Live Demo
                          </h4>
                          <div className="space-y-2">
                            <a
                              href="https://www.urbanlens.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline font-semibold block"
                            >
                              🌐 https://www.urbanlens.app/
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                    openModal("", "", undefined, content, headerContent, carouselItems);
                  }}
                  className="rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left relative overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/Nasa Hack/1.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors"></div>
                  <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold z-10">
                    Hackathon
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 pr-16 drop-shadow-lg">
                      City Planner
                    </h3>
                    <p className="text-white drop-shadow-md mb-2">NASA Space Apps Challenge</p>
                    <p className="text-white font-semibold drop-shadow-md">🥉 3rd Place</p>
                  </div>
                </button>

                {/* Zürich Ai Hack */}
                <button
                  onClick={() => {
                    const carouselItems = [
                      { type: 'image' as const, src: '/Zuerich Hack/1.png' },
                      { type: 'image' as const, src: '/Zuerich Hack/2.png' },
                      { type: 'image' as const, src: '/Zuerich Hack/3.png' },
                      { type: 'image' as const, src: '/Zuerich Hack/4.png' },
                      { type: 'video' as const, src: 'https://www.youtube.com/watch?v=tGFbolKX4Ts' },
                    ];
                    const headerContent = (
                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          Zürich AI Hack 2025 – "Guidely: AI Desktop Guidance Assistant" | Guidely
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">Hackathon</span>
                          <span>Zürich</span>
                          <span>•</span>
                          <span>November 2025</span>
                          <span>•</span>
                          <span>Team of 3</span>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          Guidely is a desktop application built for Zürich AI Hack 2025. It helps users complete tasks on their computer by generating interactive, step-by-step tutorials.
                        </p>
                      </div>
                    );

                    const content = (
                      <div className="space-y-10">
                        {/* Overview */}
                        <div className="space-y-3">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                            Overview
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            Guidely is a desktop application built for Zürich AI Hack 2025. It helps users complete tasks on their computer by generating interactive, step-by-step tutorials. A user describes what they want to accomplish, and Guidely produces a guided workflow directly on top of the user's screen, highlighting exactly where to click and what to do next. The goal is to make unfamiliar software and multi-step actions accessible without searching manuals or videos.
                          </p>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-6">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                            Key Features
                          </h4>
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Natural-language task input:</strong>
                                  <span className="text-gray-700"> users type what they want to achieve.</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Interactive on-screen guidance:</strong>
                                  <span className="text-gray-700"> overlays highlight the exact click targets.</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Step-by-step instructions:</strong>
                                  <span className="text-gray-700"> visual markers + text instructions in a side panel.</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                                <div>
                                  <strong className="text-gray-900">Context-aware workflows:</strong>
                                  <span className="text-gray-700"> guidance adapts to the current contents of the user's screen.</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* My Role */}
                        <div className="space-y-3 bg-blue-50 rounded-xl p-6 border border-blue-100">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                            My Role
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            I built the core application, including the full AI guidance pipeline, the desktop integration, and the overlay system. I implemented all functional components within 23 hours, while my teammates focused on the pitch and business model.
                          </p>
                        </div>

                        {/* How it works */}
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></span>
                            How it works
                          </h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            Guidely captures the user's screen, sends the screenshot to an OpenAI model to determine the next action and target UI element, and extracts the relevant text. A Python vision step then identifies the pixel location of that element on-screen. The application renders a blue highlight overlay at the correct position and shows the instruction in text form alongside it. This cycle continues until the entire workflow is completed.
                          </p>
                        </div>

                        {/* Project Video */}
                        <div className="space-y-3">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></span>
                            Project Video
                          </h4>
                          <div className="w-full aspect-video rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <iframe
                              src="https://www.youtube.com/embed/tGFbolKX4Ts"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Guidely Project Video"
                            />
                          </div>
                        </div>

                        {/* Challenges Overcome */}
                        <div className="space-y-4 bg-orange-50 rounded-xl p-6 border border-orange-100">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                            Challenges Overcome
                          </h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-orange-500 mt-1">•</span>
                              <span><strong>Accurate on-screen element localization:</strong> mapping model outputs to actual pixel coordinates across different apps.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-orange-500 mt-1">•</span>
                              <span><strong>Consistent step sequencing:</strong> ensuring the generated steps remain aligned with the live screen state.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-orange-500 mt-1">•</span>
                              <span><strong>Low-latency interaction:</strong> keeping the guidance loop responsive and usable in real time.</span>
                            </li>
                          </ul>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></span>
                            Tech Stack
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                              <div>
                                <strong className="text-gray-900">Platform:</strong>
                                <span className="text-gray-700"> Electron desktop app (main process, preload layer, widget overlay)</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <div>
                                <strong className="text-gray-900">UI:</strong>
                                <span className="text-gray-700"> React + TypeScript</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <div>
                                <strong className="text-gray-900">Styling:</strong>
                                <span className="text-gray-700"> Tailwind CSS + PostCSS</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                              <div>
                                <strong className="text-gray-900">AI/Vision pipeline:</strong>
                                <span className="text-gray-700"> OpenAI screenshot understanding + Python-based text/element localization</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              <div>
                                <strong className="text-gray-900">Build/bundling:</strong>
                                <span className="text-gray-700"> standard Electron + React toolchain (configured via project scripts)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                    openModal("", "", undefined, content, headerContent, carouselItems);
                  }}
                  className="rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left relative overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/Zuerich Hack/1.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors"></div>
                  <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold z-10">
                    Hackathon
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 pr-16 drop-shadow-lg">
                      Zürich AI Hack
                    </h3>
                    <p className="text-white drop-shadow-md mb-2">AI Hackathon</p>
                    <p className="text-white font-semibold drop-shadow-md">🥈 2nd Place (out of 40 teams)</p>
                    <p className="text-white text-sm mt-1 drop-shadow-md">💰 3k earnings</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Remote Controlled Ball - Alone */}
            <div className="mt-8">
              <button
                onClick={() => {
                  const carouselItems = [
                    { type: 'model' as const, src: '/Kugel_rerender2.glb' },
                  ];
                  openModal(
                    "Remote Controlled Ball",
                    "A robotics project involving a remote-controlled ball. This project demonstrates skills in embedded systems, control theory, and hardware integration.",
                    undefined,
                    undefined,
                    undefined,
                    carouselItems
                  );
                }}
                className="bg-gray-800 hover:bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left w-full md:w-1/2 mx-auto block relative"
              >
                <span className="absolute top-3 right-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                  Personal Project
                </span>
                <h3 className="text-xl font-bold text-white mb-2 pr-24">
                  Remote Controlled Ball
                </h3>
                <p className="text-gray-300">Robotics Project</p>
              </button>
            </div>
          </div>
        </section>

        <EducationModal
          isOpen={modalOpen}
          onClose={closeModal}
          title={modalTitle}
          description={modalDescription}
          images={modalImages}
          carouselItems={modalCarouselItems}
          content={modalContent}
          headerContent={modalHeaderContent}
        />
        
        {/* Spacer to enable scrolling */}
        <div className="h-[400vh]"></div>
      </main>
    </>
  );
}


"use client";

import React from 'react';
import { Project } from '@/types';
import {
  createSectionHeader,
  createFeatureList,
  createTechStack,
  createHighlightedSection,
  createProjectHeader,
} from '@/lib/modalContent';

// This file contains project data. For maintainability, project content is generated
// using utility functions. To add a new project, add it to the projects array below.

export const projects: Project[] = [
  {
    id: 'remote-ball',
    title: 'Remote Controlled Ball',
    shortTitle: 'Remote Controlled Ball',
    description: 'A spherical robot controlled via smartphone through a web interface. The ball moves forward by spinning its inner mechanism and sideways by shifting an internal mass.',
    type: 'personal',
    tags: [
      { label: 'Personal Project', color: 'bg-green-100 text-green-800' },
      { label: 'Robotics' },
      { label: 'Control Systems' },
      { label: 'Embedded Systems' },
    ],
    metadata: {},
    backgroundImage: '/ball/image.png',
    carouselItems: [
      { type: 'model', src: '/Kugel_rerender6.glb' },
    ],
    headerContent: createProjectHeader(
      'Remote Controlled Ball',
      [
        { label: 'Personal Project', color: 'bg-green-100 text-green-800' },
        { label: 'Robotics' },
        { label: 'Control Systems' },
        { label: 'Embedded Systems' },
      ],
      'A spherical robot controlled via smartphone through a web interface. The ball moves forward by spinning its inner mechanism and sideways by shifting an internal mass.'
    ),
    content: (
      <div className="space-y-8">
        <div className="mt-20">
          {createHighlightedSection(
            'Overview',
            <div>
              <p className="text-gray-700 leading-relaxed text-base">
                I built a remote-controlled spherical robot that can be controlled from a smartphone. The ball hosts its own web interface that I can connect to wirelessly, allowing me to control movement and direction in real-time.
              </p>
              <p className="text-gray-700 leading-relaxed text-base mt-4">
                The 3D model shows the internal mechanism, which is designed to fit inside an outer spherical shell. A copper rod connects the inner frame firmly to the outer ball shell, ensuring the mechanism can transfer motion to the ball.
              </p>
            </div>,
          'from-blue-500 to-purple-500',
          'bg-blue-50',
          'border-blue-200'
          )}
        </div>
        <div className="space-y-6 mt-16">
          {createSectionHeader('Key Features', 'from-purple-500 to-pink-500')}
          {createFeatureList([
            { title: 'Web Interface', description: 'website hosted on the ball, accessible from smartphone for control', color: 'bg-blue-500' },
            { title: 'Forward Movement', description: 'the entire inner mechanism spins around its own axis, propelling the ball forward', color: 'bg-green-500' },
            { title: 'Sideways Movement', description: 'a second motor shifts an internal mass, allowing the ball to move left or right', color: 'bg-purple-500' },
            { title: 'Mechanical Design', description: 'copper rod connects inner frame to outer shell, 3D model shows internal structure', color: 'bg-orange-500' },
          ])}
        </div>
        {createHighlightedSection(
          'Mechanical Design',
          <div>
            <p className="text-gray-700 leading-relaxed text-base">
              The 3D model displays the internal mechanism that sits inside the outer ball shell. The copper rod is firmly connected to the outer shell, creating a rigid connection between the inner frame and the ball.
            </p>
            <p className="text-gray-700 leading-relaxed text-base mt-4">
              For forward movement, the entire inner assembly rotates around its central axis. This rotation is transferred through the copper rod to the outer shell, causing the ball to roll forward. For sideways movement, a second motor shifts an internal mass to one side, tilting the ball and creating differential motion that results in left or right movement.
            </p>
          </div>
        )}
        <div className="space-y-4">
          {createSectionHeader('Skills Demonstrated', 'from-indigo-500 to-blue-500')}
          {createTechStack([
            { category: 'Control Theory', technology: 'PID control, stability analysis', color: 'bg-indigo-500' },
            { category: 'Embedded Systems', technology: 'microcontroller programming', color: 'bg-blue-500' },
            { category: 'Hardware Integration', technology: 'sensors, actuators, communication modules', color: 'bg-green-500' },
            { category: '3D Modeling', technology: 'Blender, mechanical design', color: 'bg-purple-500' },
          ])}
        </div>
      </div>
    ),
  },
  {
    id: 'ball-on-plate',
    title: 'Ball on a Plate',
    shortTitle: 'Ball on a Plate',
    description: 'A control system project from ETH implementing RRT, RRT*, and RRT* smart path planning algorithms for ball control via plate angle manipulation.',
    type: 'personal',
    tags: [
      { label: 'ETH Project', color: 'bg-purple-100 text-purple-800' },
      { label: 'Control Systems' },
      { label: 'Path Planning' },
    ],
    metadata: {},
    backgroundImage: '/BoaP/BoaP_example_image.png',
    carouselItems: [
      { type: 'image', src: '/BoaP/BoaP_example_image.png' },
      { type: 'image', src: '/BoaP/rrt_image.png' },
    ],
    headerContent: createProjectHeader(
      'Ball on a Plate',
      [
        { label: 'ETH Project', color: 'bg-purple-100 text-purple-800' },
        { label: 'Control Systems' },
        { label: 'Path Planning' },
      ],
      'A control system project from ETH implementing RRT, RRT*, and RRT* smart path planning algorithms for ball control via plate angle manipulation.'
    ),
    content: (
      <div className="space-y-8">
        <div className="mt-20">
          {createHighlightedSection(
            'Overview',
            <p className="text-gray-700 leading-relaxed text-base">
              Ball on a Plate is a control system project developed at ETH Zurich. The system consists of a ball that can be controlled by adjusting the angle of the plate it rests on. Multiple controllers are used to achieve precise ball positioning and trajectory control through plate angle manipulation.
            </p>,
            'from-blue-500 to-purple-500',
            'bg-blue-50',
            'border-blue-200'
          )}
        </div>
        <div className="space-y-6 mt-16">
          {createSectionHeader('System Overview', 'from-purple-500 to-pink-500')}
          <div className="space-y-4">
            <img
              src="/BoaP/BoaP_example_image.png"
              alt="Ball on a Plate example system"
              className="w-full rounded-xl shadow-lg border border-gray-200"
            />
            <p className="text-gray-600 text-sm italic text-center">
              Example image of the Ball on a Plate system
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              The system demonstrates a classic control problem where a ball must be maneuvered across a plate by tilting the plate in different directions. This requires sophisticated control algorithms to predict and execute the ball's path based on plate angle adjustments.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          {createSectionHeader('Path Planning Implementation', 'from-indigo-500 to-blue-500')}
          <div className="space-y-4">
            <img
              src="/BoaP/rrt_image.png"
              alt="RRT path planning visualization"
              className="w-full rounded-xl shadow-lg border border-gray-200"
            />
            <p className="text-gray-700 leading-relaxed text-base">
              I implemented three path planning algorithms for this project: RRT (Rapidly-exploring Random Tree), RRT*, and RRT* Smart. The visualization shows the planned path with grey regions around the trajectory representing the thickness of the ball, accounting for the physical constraints and safety margins required for successful navigation.
            </p>
            <div className="bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-purple-50/30 rounded-xl p-6 border border-gray-200/60 shadow-md space-y-4">
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Implemented Algorithms</h5>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h6 className="font-bold text-gray-900 mb-2">Rapidly-Exploring Random Tree (RRT)</h6>
                  <p className="text-sm leading-relaxed">
                    I implemented the classic RRT algorithm for motion planning in cluttered environments. RRT incrementally grows a tree of collision-free states by sampling random points in the configuration space and connecting them to the nearest node if the straight-line path is obstacle-free. Because it aggressively explores large, unknown regions, it is very good at quickly finding a feasible path from start to goal – but that first path is usually quite suboptimal and jagged.
                  </p>
                </div>
                <div>
                  <h6 className="font-bold text-gray-900 mb-2">RRT*: Asymptotically Optimal RRT</h6>
                  <p className="text-sm leading-relaxed">
                    To improve path quality, I implemented RRT*, which extends RRT with a cost-aware rewiring step. As the tree grows, each new node not only connects to the nearest state, but also chooses the parent that yields the lowest cost-to-come, and then "rewires" nearby nodes through this new state if it shortens their path. Over time, the tree converges to an asymptotically optimal solution: the path becomes shorter and smoother as more samples are added, at the cost of higher computation per iteration.
                  </p>
                </div>
                <div>
                  <h6 className="font-bold text-gray-900 mb-2">RRT*-Smart: Biased, Beacon-Guided Optimization</h6>
                  <p className="text-sm leading-relaxed">
                    Finally, I implemented RRT*-Smart, which accelerates RRT*'s convergence by combining online path smoothing with intelligent sampling. Once a first path is found, the algorithm optimizes the path by removing redundant waypoints and straightening segments, extracts "beacon" nodes along this optimized path, and biases future samples to lie in a region around these beacons, while still mixing in uniform samples for global exploration. This focused sampling around a continually re-optimized path lets RRT*-Smart reach high-quality paths much faster than plain RRT*, especially in cluttered environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {createHighlightedSection(
          'Technical Implementation',
          <p className="text-gray-700 leading-relaxed text-base">
            The entire project, including all RRT algorithm implementations, is written in Python. The grey regions in the path visualization represent the physical ball thickness, ensuring that the planned trajectories account for the actual ball dimensions and provide safe navigation margins. Another team member implemented a controller that tracks the planned path.
          </p>
        )}
        <div className="space-y-4">
          {createSectionHeader('Skills Demonstrated', 'from-indigo-500 to-blue-500')}
          {createTechStack([
            { category: 'Path Planning', technology: 'RRT, RRT*, RRT* Smart algorithms', color: 'bg-indigo-500' },
            { category: 'Programming', technology: 'Python implementation', color: 'bg-green-500' },
            { category: 'Robotics', technology: 'motion planning, trajectory optimization', color: 'bg-purple-500' },
          ])}
        </div>
        <div className="space-y-3">
          {createSectionHeader('Project Context', 'from-blue-500 to-purple-500')}
          <p className="text-gray-700 leading-relaxed text-base">
            This project was developed as part of coursework at ETH Zurich, demonstrating advanced understanding of path planning algorithms, control theory, and their practical application in robotics systems.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'zurich-hack',
    title: 'Zürich AI Hack 2025 – "Guidely: AI Desktop Guidance Assistant"',
    shortTitle: 'Zürich AI Hack',
    description: 'Guidely is a desktop application built for Zürich AI Hack 2025. It helps users complete tasks on their computer by generating interactive, step-by-step tutorials.',
    type: 'hackathon',
    tags: [
      { label: 'Hackathon', color: 'bg-blue-100 text-blue-800' },
      { label: 'Zürich' },
      { label: 'November 2025' },
      { label: 'Team of 3' },
    ],
    metadata: {
      location: 'Zürich',
      date: 'November 2025',
      teamSize: 'Team of 3',
      place: '🥈 2nd Place (out of 40 teams)',
      earnings: '💰 3k earnings',
    },
    backgroundImage: '/Zuerich Hack/1.png',
    carouselItems: [
      { type: 'image', src: '/Zuerich Hack/1.png' },
      { type: 'image', src: '/Zuerich Hack/2.png' },
      { type: 'image', src: '/Zuerich Hack/3.png' },
      { type: 'image', src: '/Zuerich Hack/4.png' },
      { type: 'video', src: 'https://www.youtube.com/watch?v=tGFbolKX4Ts' },
    ],
    headerContent: createProjectHeader(
      'Zürich AI Hack 2025 – "Guidely: AI Desktop Guidance Assistant"',
      [
        { label: 'Hackathon', color: 'bg-blue-100 text-blue-800' },
        { label: 'Zürich' },
        { label: 'November 2025' },
        { label: 'Team of 3' },
      ],
      'Guidely is a desktop application built for Zürich AI Hack 2025. It helps users complete tasks on their computer by generating interactive, step-by-step tutorials.'
    ),
    content: (
      <div className="space-y-8">
        <div className="mt-20">
          {createHighlightedSection(
            'Overview',
            <p className="text-gray-700 leading-relaxed text-base">
              Guidely is a desktop application built for Zürich AI Hack 2025. It helps users complete tasks on their computer by generating interactive, step-by-step tutorials. A user describes what they want to accomplish, and Guidely produces a guided workflow directly on top of the user's screen, highlighting exactly where to click and what to do next. The goal is to make unfamiliar software and multi-step actions accessible without searching manuals or videos.
            </p>,
          'from-blue-500 to-purple-500',
          'bg-blue-50',
          'border-blue-200'
          )}
        </div>
        <div className="space-y-6 mt-16">
          {createSectionHeader('Key Features', 'from-purple-500 to-pink-500')}
          {createFeatureList([
            { title: 'Natural-language task input', description: 'users type what they want to achieve.', color: 'bg-blue-500' },
            { title: 'Interactive on-screen guidance', description: 'overlays highlight the exact click targets.', color: 'bg-green-500' },
            { title: 'Step-by-step instructions', description: 'visual markers + text instructions in a side panel.', color: 'bg-purple-500' },
            { title: 'Context-aware workflows', description: 'guidance adapts to the current contents of the user\'s screen.', color: 'bg-orange-500' },
          ])}
        </div>
        {createHighlightedSection(
          'My Role',
          <p className="text-gray-700 leading-relaxed text-base">
            I built the core application, including the full AI guidance pipeline, the desktop integration, and the overlay system. I implemented all functional components within 23 hours, while my teammates focused on the pitch and business model.
          </p>
        )}
        {createHighlightedSection(
          'How it works',
          <p className="text-gray-700 leading-relaxed text-base">
            Guidely captures the user's screen, sends the screenshot to an OpenAI model to determine the next action and target UI element, and extracts the relevant text. A Python vision step then identifies the pixel location of that element on-screen. The application renders a blue highlight overlay at the correct position and shows the instruction in text form alongside it. This cycle continues until the entire workflow is completed.
          </p>,
          'from-indigo-500 to-blue-500',
          'bg-indigo-50',
          'border-indigo-200'
        )}
        <div className="space-y-3">
          {createSectionHeader('Project Video', 'from-red-500 to-pink-500')}
          <div className="w-full aspect-video rounded-2xl shadow-2xl border border-gray-200/60 ring-4 ring-blue-100/30 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/tGFbolKX4Ts"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Guidely Project Video"
            />
          </div>
        </div>
        <div className="space-y-4 bg-gradient-to-br from-orange-50 to-red-50/30 rounded-2xl p-6 md:p-8 border border-gray-200/60 shadow-lg shadow-orange-100/30 backdrop-blur-sm">
          {createSectionHeader('Challenges Overcome', 'from-orange-500 to-red-500')}
          <ul className="space-y-3 pt-1">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1.5 font-bold text-lg">•</span>
              <span className="text-gray-700 leading-relaxed"><strong className="text-gray-900 font-semibold">Accurate on-screen element localization:</strong> mapping model outputs to actual pixel coordinates across different apps.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1.5 font-bold text-lg">•</span>
              <span className="text-gray-700 leading-relaxed"><strong className="text-gray-900 font-semibold">Consistent step sequencing:</strong> ensuring the generated steps remain aligned with the live screen state.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1.5 font-bold text-lg">•</span>
              <span className="text-gray-700 leading-relaxed"><strong className="text-gray-900 font-semibold">Low-latency interaction:</strong> keeping the guidance loop responsive and usable in real time.</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          {createSectionHeader('Tech Stack', 'from-indigo-500 to-blue-500')}
          {createTechStack([
            { category: 'Platform', technology: 'Electron desktop app (main process, preload layer, widget overlay)', color: 'bg-indigo-500' },
            { category: 'UI', technology: 'React + TypeScript', color: 'bg-blue-500' },
            { category: 'Styling', technology: 'Tailwind CSS + PostCSS', color: 'bg-green-500' },
            { category: 'AI/Vision pipeline', technology: 'OpenAI screenshot understanding + Python-based text/element localization', color: 'bg-purple-500' },
            { category: 'Build/bundling', technology: 'standard Electron + React toolchain (configured via project scripts)', color: 'bg-orange-500' },
          ])}
        </div>
      </div>
    ),
  },
  {
    id: 'nasa-hack',
    title: 'NASA Space Apps Challenge 2025 – "Data Pathways to Healthy Cities" | UrbanLens',
    shortTitle: 'City Planner',
    description: 'UrbanLens is a web platform built during the NASA Space Apps Challenge in Lucerne. We tackled the theme Data Pathways to Healthy Cities and Human Settlements by creating an interactive map of Zurich that overlays diverse environmental datasets.',
    type: 'hackathon',
    tags: [
      { label: 'Hackathon', color: 'bg-blue-100 text-blue-800' },
      { label: 'Lucerne' },
      { label: 'October 2025' },
      { label: 'Team of 5' },
    ],
    metadata: {
      location: 'Lucerne',
      date: 'October 2025',
      teamSize: 'Team of 5',
      place: '🥉 3rd Place',
    },
    backgroundImage: '/Nasa Hack/1.png',
    carouselItems: [
      { type: 'image', src: '/Nasa Hack/1.png' },
      { type: 'image', src: '/Nasa Hack/2.png' },
      { type: 'image', src: '/Nasa Hack/3.png' },
      { type: 'video', src: 'https://www.youtube.com/watch?v=XYicrR4ybDM&t=25s' },
    ],
    headerContent: createProjectHeader(
      'NASA Space Apps Challenge 2025 – "Data Pathways to Healthy Cities" | UrbanLens',
      [
        { label: 'Hackathon', color: 'bg-blue-100 text-blue-800' },
        { label: 'Lucerne' },
        { label: 'October 2025' },
        { label: 'Team of 5' },
      ],
      'UrbanLens is a web platform built during the NASA Space Apps Challenge in Lucerne. We tackled the theme Data Pathways to Healthy Cities and Human Settlements by creating an interactive map of Zurich that overlays diverse environmental datasets.'
    ),
    content: (
      <div className="space-y-8">
        <div className="mt-20">
          {createHighlightedSection(
            'Overview',
            <p className="text-gray-700 leading-relaxed text-base">
              UrbanLens is a web platform built during the NASA Space Apps Challenge in Lucerne. We tackled the theme Data Pathways to Healthy Cities and Human Settlements by creating an interactive map of Zurich that overlays diverse environmental datasets. We consolidated heterogeneous sources into a single pipeline, analyzed them in Python, and used unsupervised machine learning to detect urban anomalies. The results are visualized as layered, explorable insights for city-scale health and sustainability.
            </p>,
          'from-blue-500 to-purple-500',
          'bg-blue-50',
          'border-blue-200'
          )}
        </div>
        <div className="space-y-6 mt-16">
          {createSectionHeader('Key Features', 'from-purple-500 to-pink-500')}
          <div className="bg-gradient-to-br from-cyan-50/60 via-blue-50/40 to-indigo-50/30 rounded-xl p-6 border border-gray-200/60 shadow-md">
            <p className="text-gray-700 mb-4 font-semibold">Multi-layer environmental dashboard for Zurich, including:</p>
            {createFeatureList([
              { title: 'Surface Temperature', description: '(NASA/ESA Earthdata)', color: 'bg-blue-500' },
              { title: 'Soil Sealing / Imperviousness', description: '(Earthdata)', color: 'bg-green-500' },
              { title: 'Air Pollution', description: '(OpenSense map + inverse-distance interpolation)', color: 'bg-orange-500' },
              { title: 'Population Density', description: '(NASA datasets)', color: 'bg-purple-500' },
              { title: 'Public Land Use', description: '(City of Zurich open data)', color: 'bg-pink-500' },
              { title: 'Tree Cover / Vegetation', description: '(NASA data)', color: 'bg-emerald-500' },
              { title: 'Transportation Reachability Layer', description: '(travel range within 10 minutes)', color: 'bg-cyan-500' },
            ])}
            <div className="mt-5 space-y-2.5 text-gray-700">
              <p className="flex items-start gap-2.5">
                <span className="text-blue-500 mt-1.5 font-bold">•</span>
                <span className="text-sm leading-relaxed">Automated ingestion and alignment of satellite + city datasets into a unified grid</span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-blue-500 mt-1.5 font-bold">•</span>
                <span className="text-sm leading-relaxed">Unsupervised anomaly detection to identify unusual environmental patterns</span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-blue-500 mt-1.5 font-bold">•</span>
                <span className="text-sm leading-relaxed">Interactive web map to explore anomalies and underlying layers spatially</span>
              </p>
            </div>
          </div>
        </div>
        {createHighlightedSection(
          'My Role',
          <p className="text-gray-700 leading-relaxed text-base">
            I built the Python API, ran the entire analysis pipeline in Jupyter Notebook, and implemented the transportation data layer that computes and visualizes 10-minute travel reachability across the city.
          </p>
        )}
        <div className="space-y-4">
          {createSectionHeader('Public Transport', 'from-indigo-500 to-blue-500')}
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            I retrieved public transport data from an external API and used it to compute the area that can be reached within 10 minutes from any given point. Based on this reachable region, I then calculated a transport-accessibility score for every location on the map, reflecting how well each area is served by public transport.
          </p>
          <img
            src="/Nasa Hack/3.png"
            alt="Public Transport"
            className="w-full rounded-xl shadow-lg border border-gray-200"
          />
        </div>
        <div className="space-y-3">
          {createSectionHeader('Project Video', 'from-red-500 to-pink-500')}
          <div className="w-full aspect-video rounded-2xl shadow-2xl border border-gray-200/60 ring-4 ring-blue-100/30 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/XYicrR4ybDM?start=25"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="UrbanLens Project Video"
            />
          </div>
        </div>
        <div className="space-y-4 bg-gradient-to-br from-orange-50 to-red-50/30 rounded-2xl p-6 md:p-8 border border-gray-200/60 shadow-lg shadow-orange-100/30 backdrop-blur-sm">
          {createSectionHeader('Challenges Overcome', 'from-orange-500 to-red-500')}
          <ul className="space-y-3 pt-1">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1.5 font-bold text-lg">•</span>
              <span className="text-gray-700 leading-relaxed"><strong className="text-gray-900 font-semibold">Heterogeneous data formats:</strong> merged sources with different projections, resolutions, and grids into a single aligned dataset</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1.5 font-bold text-lg">•</span>
              <span className="text-gray-700 leading-relaxed"><strong className="text-gray-900 font-semibold">No labeled ground truth:</strong> designed a robust unsupervised pipeline to surface meaningful urban anomalies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1.5 font-bold text-lg">•</span>
              <span className="text-gray-700 leading-relaxed"><strong className="text-gray-900 font-semibold">Real-time visualization:</strong> ensured the frontend could render multiple heavy geospatial layers smoothly</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          {createSectionHeader('Tech Stack', 'from-indigo-500 to-blue-500')}
          {createTechStack([
            { category: 'Frontend', technology: 'React, Next.js', color: 'bg-indigo-500' },
            { category: 'Backend', technology: 'Python (FastAPI)', color: 'bg-blue-500' },
            { category: 'Data/ML', technology: 'Jupyter Notebook, scikit-learn (Isolation Forest)', color: 'bg-green-500' },
            { category: 'Geospatial', technology: 'GeoPandas, Rasterio', color: 'bg-purple-500' },
            { category: 'Deployment', technology: 'Vercel', color: 'bg-orange-500' },
          ])}
        </div>
        <div className="space-y-3 bg-gradient-to-br from-blue-50 via-purple-50/50 to-blue-50 rounded-2xl p-6 md:p-8 border border-gray-200/60 shadow-lg shadow-blue-100/30 backdrop-blur-sm">
          {createSectionHeader('Live Demo', 'from-blue-500 to-purple-500')}
          <div className="space-y-2 pt-1">
            <a
              href="https://www.urbanlens.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-semibold text-base transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>🌐</span>
              <span>https://www.urbanlens.app/</span>
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'start-hack',
    title: 'StartHack 2024 | Progress Pact',
    shortTitle: 'Start Hack 24 - Progress Pact',
    description: 'A web app to improve workplace well-being through AI coaching, gamified goal tracking, and social engagement.',
    type: 'hackathon',
    tags: [
      { label: 'Hackathon', color: 'bg-blue-100 text-blue-800' },
      { label: 'St Gallen' },
      { label: 'March 2025' },
      { label: 'Team of 4' },
    ],
    metadata: {
      location: 'St Gallen',
      date: 'March 2025',
      teamSize: 'Team of 4',
    },
    backgroundImage: "/Start Hack/1.png",
    carouselItems: [
      { type: 'image', src: '/Start Hack/1.png' },
      { type: 'image', src: '/Start Hack/2.png' },
      { type: 'image', src: '/Start Hack/3.png' },
      { type: 'image', src: '/Start Hack/4.png' },
    ],
    headerContent: createProjectHeader(
      'StartHack 2024 | Progress Pact',
      [
        { label: 'Hackathon', color: 'bg-blue-100 text-blue-800' },
        { label: 'St Gallen' },
        { label: 'March 2025' },
        { label: 'Team of 4' },
      ],
      'A web app to improve workplace well-being through AI coaching, gamified goal tracking, and social engagement.'
    ),
    content: (
      <div className="space-y-8">
        <div className="mt-20">
          {createHighlightedSection(
            'Overview',
            <div>
              <p className="text-gray-700 leading-relaxed text-base">
                Progress Pact is a comprehensive web application designed to cultivate happiness and wellness among employees while fostering connections across different departments, languages, and geographical locations. Built for the Belimo Challenge at StartHack 2024 (St. Gallen), our platform aims to dismantle barriers and envision a world where universal health and well-being are attainable for all. We advanced to the finalist stage and narrowly missed winning the challenge.
              </p>
              <p className="text-gray-700 leading-relaxed text-base mt-4">
                Our mission is to create a holistic solution that integrates AI-powered coaching, gamified goal tracking, multilingual communication, and social engagement into a single, cohesive platform that transforms workplace culture and employee well-being.
              </p>
            </div>,
            'from-blue-500 to-purple-500',
            'bg-blue-50',
            'border-blue-200'
          )}
        </div>
        <div className="space-y-4">
          {createSectionHeader('Core Concept', 'from-green-500 to-emerald-500')}
          <p className="text-gray-700 mb-3">
            Progress Pact promotes holistic well-being through four pillars:
          </p>
          {createFeatureList([
            { title: 'Health & Exercise', description: 'realistic, AI-guided routines and goals.', color: 'bg-blue-500' },
            { title: 'Nutrition & Lifestyle', description: 'tracking balance and daily habits.', color: 'bg-green-500' },
            { title: 'Social Interaction & Events', description: 'discovering and joining activities that build community.', color: 'bg-purple-500' },
            { title: 'Workplace Culture', description: 'making well-being part of everyday company life.', color: 'bg-orange-500' },
          ])}
        </div>
        <div className="space-y-6 mt-16">
          {createSectionHeader('Key Features', 'from-purple-500 to-pink-500')}
          <div className="space-y-8">
            <div className="space-y-3">
              <img
                src="/Start Hack/2.png"
                alt="AI Coach Feature"
                className="w-full rounded-2xl shadow-2xl border border-gray-200/60 ring-4 ring-blue-100/30 hover:ring-blue-200/50 transition-all duration-300"
              />
              <div>
                <h5 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">AI Coach</h5>
                <p className="text-gray-700 leading-relaxed">
                  Powered by artificial intelligence, our coaching feature provides personalized training regimens and guidance tailored to individual goals. The AI coach adapts to each user's unique needs, offering real-time support and motivation to help employees achieve their wellness objectives.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <img
                src="/Start Hack/4.png"
                alt="SMART Goals Feature"
                className="w-full rounded-2xl shadow-2xl border border-gray-200/60 ring-4 ring-blue-100/30 hover:ring-blue-200/50 transition-all duration-300"
              />
              <div>
                <h5 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Goals</h5>
                <p className="text-gray-700 leading-relaxed">
                  Users can establish objectives across various facets of life, accompanied by incentives to foster goal attainment. The system provides comprehensive tracking and gamified rewards that motivate continuous progress and achievement.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-2xl p-6 md:p-7 border border-gray-200/60 shadow-lg shadow-blue-100/30 backdrop-blur-sm">
              <h5 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Multilingual Chat</h5>
              <p className="text-gray-700 leading-relaxed text-base">
                With automatic translation capabilities, our chat feature enables seamless interaction among employees, irrespective of their preferred language, breaking down communication barriers in diverse, global workplaces.
              </p>
            </div>
            <div className="space-y-3">
              <img
                src="/Start Hack/3.png"
                alt="Events System Feature"
                className="w-full rounded-2xl shadow-2xl border border-gray-200/60 ring-4 ring-blue-100/30 hover:ring-blue-200/50 transition-all duration-300"
              />
              <div>
                <h5 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Events</h5>
                <p className="text-gray-700 leading-relaxed">
                  Discover and engage in events aligned with personal interests, facilitating connections with like-minded individuals and offering rewards for participation, either from the company or through the avatar. This feature promotes social interaction and helps build a stronger, more connected workplace community.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl p-6 md:p-7 border border-gray-200/60 shadow-lg shadow-purple-100/30 backdrop-blur-sm">
              <h5 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Feedback with an Avatar</h5>
              <p className="text-gray-700 leading-relaxed text-base">
                Employing an animated avatar, our platform delivers instantaneous responses in the form of delayed rewards and consequences, aiding users in anticipating their emotional states based on their actions. This innovative approach to behavioral feedback enhances user engagement and promotes self-awareness.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {createSectionHeader('Tech Stack', 'from-indigo-500 to-blue-500')}
          {createTechStack([
            { category: 'Frontend/Backend', technology: 'Next.js (React)', color: 'bg-indigo-500' },
            { category: 'Database/ORM', technology: 'Prisma', color: 'bg-blue-500' },
            { category: 'Auth', technology: 'NextAuth', color: 'bg-green-500' },
            { category: 'UI', technology: 'shadcn/ui', color: 'bg-purple-500' },
            { category: 'Hosting', technology: 'Vercel', color: 'bg-orange-500' },
            { category: '3D', technology: 'custom Blender models', color: 'bg-pink-500' },
            { category: 'AI Coach', technology: 'ChatGPT with user-context integration', color: 'bg-cyan-500' },
          ])}
        </div>
        <div className="space-y-3 bg-gradient-to-br from-blue-50 via-purple-50/50 to-blue-50 rounded-2xl p-6 md:p-8 border border-gray-200/60 shadow-lg shadow-blue-100/30 backdrop-blur-sm">
          {createSectionHeader('Result', 'from-blue-500 to-purple-500')}
          <p className="text-gray-700 leading-relaxed text-base pt-1">
            In 36 hours, we delivered a fully functional prototype featuring real-time chat, goal tracking, event creation, AI coaching, and a 3D animated avatar—combining AI, gamification, and workplace psychology into one cohesive platform.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'overleaf-selfhosted',
    title: 'Self-Hosted Overleaf with Automated TrueNAS Backups',
    shortTitle: 'Self-Hosted Overleaf',
    description: 'A self-hosted Overleaf deployment running on ETH servers for internal ETH use, with comprehensive documentation, automated setup scripts, Docker Compose, nginx reverse proxy, and automated TrueNAS backups.',
    type: 'personal',
    tags: [
      { label: 'ETH Project', color: 'bg-purple-100 text-purple-800' },
      { label: 'DevOps' },
      { label: 'Infrastructure' },
      { label: 'Self-Hosting' },
    ],
    metadata: {},
    backgroundImage: '/overleaf/image.png',
    carouselItems: [
      { type: 'image', src: '/overleaf/image.png' },
    ],
    headerContent: createProjectHeader(
      'Self-Hosted Overleaf with Automated TrueNAS Backups',
      [
        { label: 'ETH Project', color: 'bg-purple-100 text-purple-800' },
        { label: 'DevOps' },
        { label: 'Infrastructure' },
        { label: 'Self-Hosting' },
      ],
      'A self-hosted Overleaf deployment running on ETH servers for internal ETH use, with comprehensive documentation, automated setup scripts, Docker Compose, nginx reverse proxy, and automated TrueNAS backups.'
    ),
    content: (
      <div className="space-y-8">
        {createHighlightedSection(
          'Overview',
          <p className="text-gray-700 leading-relaxed text-base">
            This project deploys a self-hosted Overleaf Community Edition running on <strong className="text-gray-900">ETH servers for internal ETH use</strong>. I wrote comprehensive documentation and automated setup scripts (install.sh and update.sh) to enable easy deployment and maintenance. The system runs fully containerised behind nginx with TLS, with all project data and databases backed up to a dedicated TrueNAS SMB share. The entire infrastructure is production-ready and currently serving ETH users.
          </p>,
          'from-blue-500 to-purple-500',
          'bg-blue-50',
          'border-blue-200'
        )}
        <div className="space-y-6 mt-16">
          {createSectionHeader('Key Features', 'from-purple-500 to-pink-500')}
          {createFeatureList([
            { title: 'Containerised Overleaf Stack', description: 'Docker Compose setup with Overleaf CE, MongoDB replica sets, and Redis, configured for reliable startup', color: 'bg-blue-500' },
            { title: 'Reverse Proxy and TLS', description: 'nginx front-end with HTTPS termination using dedicated certificates, Overleaf bound to 127.0.0.1:4242 internally', color: 'bg-green-500' },
            { title: 'Automated Backups', description: 'nightly systemd-driven backup job that dumps MongoDB and syncs Overleaf data volumes to TrueNAS SMB share', color: 'bg-purple-500' },
            { title: 'Update Workflow', description: 'dedicated update.sh script to pull new Docker images and update TeX Live packages without touching user data', color: 'bg-orange-500' },
            { title: 'Documentation and Setup Scripts', description: 'I wrote comprehensive documentation and automated install.sh/update.sh scripts for easy deployment and maintenance', color: 'bg-pink-500' },
          ])}
        </div>
        <div className="space-y-6">
          {createSectionHeader('Technical Details', 'from-indigo-500 to-blue-500')}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-base">
              The system runs on <strong className="text-gray-900">ETH infrastructure</strong> (Proxmox-hosted Ubuntu VM) with AVX-capable virtual CPU for MongoDB. I developed the installation script (install.sh) that automates Docker Compose v2 setup, prepares the /overleaf directory, and configures the docker-compose file with Mongo replicaSet and Redis settings. Overleaf listens on 127.0.0.1:4242 behind nginx with TLS termination, serving <strong className="text-gray-900">internal ETH users</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              A systemd unit manages the Docker stack lifecycle. The sharelatex container includes a full TeX Live distribution, with packages updated via tlmgr as needed.
            </p>
            <div className="bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-yellow-50/30 rounded-xl p-6 border border-gray-200/60 shadow-md">
              <h5 className="text-xl font-semibold text-gray-900 mb-3">Storage and Backup Architecture</h5>
              <p className="text-gray-700 leading-relaxed mb-3">
                A TrueNAS pool and dataset are configured as an SMB share, mounted at /backup on the Ubuntu VM. A nightly systemd timer triggers a backup script that runs mongodump and rsyncs Overleaf data, MongoDB, and Redis volumes into date-stamped folders on the TrueNAS share.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The update.sh script pulls newer Docker images, restarts the stack, and optionally updates TeX Live packages, all without reinstalling or reconfiguring the system.
              </p>
            </div>
          </div>
        </div>
        {createHighlightedSection(
          'TrueNAS Configuration',
          <p className="text-gray-700 leading-relaxed text-base">
            I configured the TrueNAS system from scratch, setting up the storage pool, datasets, and SMB share with proper access controls. This provides reliable, scalable storage for the backup system.
          </p>
        )}
        <div className="space-y-4">
          {createSectionHeader('Skills Demonstrated', 'from-indigo-500 to-blue-500')}
          {createTechStack([
            { category: 'Linux and Virtualisation', technology: 'provisioning and tuning VMs under Proxmox, including CPU features, partitioning, and resource management', color: 'bg-indigo-500' },
            { category: 'Containerisation and Orchestration', technology: 'Docker Compose configuration for multi-service stacks (Overleaf, MongoDB replica set, Redis) and systemd integration', color: 'bg-blue-500' },
            { category: 'Networking and Web Services', technology: 'nginx reverse proxy setup with HTTPS, local binding of application ports, and certificate handling', color: 'bg-green-500' },
            { category: 'Storage and Backup', technology: 'TrueNAS pool and SMB share configuration, CIFS mounting on Linux, and robust backup scripting with mongodump and rsync', color: 'bg-purple-500' },
            { category: 'Automation and Documentation', technology: 'Bash scripting for reproducible install/update workflows and updating existing deployment guides to match the new architecture', color: 'bg-orange-500' },
          ])}
        </div>
      </div>
    ),
  },
];


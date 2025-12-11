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
    id: 'start-hack',
    title: 'StartHack 2024 – Belimo Challenge | Progress Pact',
    shortTitle: 'Start Hack 24 - Belimo',
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
      'StartHack 2024 – Belimo Challenge | Progress Pact',
      [
        { label: 'Hackathon', color: 'bg-blue-100 text-blue-800' },
        { label: 'St Gallen' },
        { label: 'March 2025' },
        { label: 'Team of 4' },
      ],
      'A web app to improve workplace well-being through AI coaching, gamified goal tracking, and social engagement.'
    ),
    content: (
      <div className="space-y-10">
        <div className="space-y-3">
          {createSectionHeader('Overview', 'from-blue-500 to-purple-500')}
          <p className="text-gray-700 leading-relaxed text-base">
            Progress Pact is a prototype we built for the Belimo Challenge at StartHack 2024 (St. Gallen). The app supports employee well-being across health, nutrition, exercise, and social connection—aiming to create a happier, more productive workplace. We advanced to the finalist stage and narrowly missed winning the challenge.
          </p>
        </div>
        {/* Additional content sections would go here - simplified for maintainability */}
      </div>
    ),
  },
  {
    id: 'remote-ball',
    title: 'Remote Controlled Ball',
    shortTitle: 'Remote Controlled Ball',
    description: 'A spherical robot that moves by shifting an internal weighted core using an orthogonal motor setup, creating controllable center of mass shifts for directional rolling.',
    type: 'personal',
    tags: [
      { label: 'Personal Project', color: 'bg-green-100 text-green-800' },
      { label: 'Robotics' },
      { label: 'Control Systems' },
      { label: 'Embedded Systems' },
    ],
    metadata: {},
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
      'A spherical robot that moves by shifting an internal weighted core using an orthogonal motor setup, creating controllable center of mass shifts for directional rolling.'
    ),
    content: (
      <div className="space-y-10">
        <div className="space-y-3">
          {createSectionHeader('Overview', 'from-blue-500 to-purple-500')}
          <p className="text-gray-700 leading-relaxed text-base">
            This project implements a spherical robot that moves by shifting an internal weighted core using an orthogonal motor setup. By rotating the core left–right inside the shell, the robot creates a controllable shift of its centre of mass, causing the sphere to roll in the desired direction. Forward motion is generated when the longitudinal motor rotates the whole mass forward, producing a forward roll of the shell. Turning is achieved by the lateral motor: shifting the internal mass sideways tilts the sphere, creating a differential roll that results in smooth left or right rotation. The mechanism requires no wheels and relies entirely on internal actuation.
          </p>
        </div>
        <div className="space-y-6">
          {createSectionHeader('Key Features', 'from-purple-500 to-pink-500')}
          {createFeatureList([
            { title: 'Remote Control', description: 'wireless communication for real-time control of speed and direction', color: 'bg-blue-500' },
            { title: 'Control Architecture', description: 'mapping of user inputs to coordinated mass-shift and rolling motion', color: 'bg-green-500' },
            { title: 'Embedded Hardware', description: 'microcontroller-based system integrating motors, drivers, IMU, and power supply', color: 'bg-purple-500' },
            { title: '3D Modeling', description: 'detailed Blender model of the internal frame, mass, and motor arrangement', color: 'bg-orange-500' },
          ])}
        </div>
        {createHighlightedSection(
          'Technical Details',
          <p className="text-gray-700 leading-relaxed text-base">
            This project involves the design and implementation of a remote-controlled spherical robot driven purely by internal actuation. An internal frame holds two perpendicular motors that reposition a weighted core relative to the shell. By adjusting the orientation of this mass, the system controls the tilt of the sphere and thereby its rolling direction. A microcontroller handles wireless commands, motor control signals, and basic safety logic. The Blender model visualises the mechanical layout, including the mounting of the motors, the mass carrier, and the relationship between the internal mechanism and the outer sphere.
          </p>
        )}
        <div className="space-y-4">
          {createSectionHeader('Skills Demonstrated', 'from-indigo-500 to-blue-500')}
          {createTechStack([
            { category: 'Control Theory', technology: 'basic modelling of spherical rolling dynamics and control design for stable motion', color: 'bg-indigo-500' },
            { category: 'Embedded Systems', technology: 'microcontroller programming, real-time motor control, wireless communication', color: 'bg-blue-500' },
            { category: 'Hardware Integration', technology: 'integration of sensors, actuators, drivers, and power electronics in a compact form factor', color: 'bg-green-500' },
            { category: '3D Modeling', technology: 'mechanical design and visualisation of the internal mechanism using Blender', color: 'bg-purple-500' },
          ])}
        </div>
      </div>
    ),
  },
];

// Note: For full project details (NASA Hack, Zürich Hack, etc.), you can either:
// 1. Add them here following the same pattern
// 2. Create separate files for each project
// 3. Use a content management system or markdown files


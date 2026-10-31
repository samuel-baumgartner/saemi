import type { Project } from '@/types';

// Shared by the interactive portfolio, server-rendered pages, and SEO routes.
export const projectSummaries = {
  'provincia': {
    id: 'provincia',
    title: 'Provincia: Colony & Combat',
    shortTitle: 'Provincia',
    description: 'Provincia is a Roman-inspired colony simulation built in Godot 4, combining settlement building, resource management, water infrastructure, and tactical combat.',
    backgroundImage: '/provincia/settlement-overview.webp',
  },
  'remote-ball': {
    id: 'remote-ball',
    title: 'Remote Controlled Ball',
    shortTitle: 'Remote Controlled Ball',
    description: 'A smartphone-controlled spherical robot by Samuel Baumgartner, combining embedded software, motor control, and an internal mechanism for rolling and steering.',
    backgroundImage: '/ball/preview-transparent.png',
  },
  'ball-on-plate': {
    id: 'ball-on-plate',
    title: 'Ball on a Plate',
    shortTitle: 'Ball on a Plate',
    description: 'An ETH Zürich control systems project using RRT, RRT*, and RRT*-Smart motion planning to steer a ball on a tilting plate, with interactive CAD and simulation.',
    backgroundImage: '/models/ball-on-plate/card-transparent.png',
  },
  'zurich-hack': {
    id: 'zurich-hack',
    title: 'Swiss AI hack 2025 – "Guidely: AI Desktop Guidance Assistant"',
    shortTitle: 'Guidely · Swiss AI hack',
    description: 'Guidely, built for Swiss AI hack 2025, helps people complete desktop tasks with AI-generated, interactive step-by-step tutorials. Second place out of 40 teams.',
    backgroundImage: '/Zuerich Hack/1.png',
  },
  'nasa-hack': {
    id: 'nasa-hack',
    title: 'NASA Space Apps Challenge 2025 – "Data Pathways to Healthy Cities" | UrbanLens',
    shortTitle: 'UrbanLens · NASA Space Apps',
    description: 'UrbanLens maps environmental datasets across Zurich to support healthier cities. Built for NASA Space Apps Challenge 2025 in Lucerne, earning third place.',
    backgroundImage: '/Nasa Hack/1.png',
  },
  'start-hack': {
    id: 'start-hack',
    title: 'StartHack 2024 | Progress Pact',
    shortTitle: 'Start Hack 24 - Progress Pact',
    description: 'A web app to improve workplace well-being through AI coaching, gamified goal tracking, and social engagement.',
    backgroundImage: "/Start Hack/1.png",
  },
  'overleaf-selfhosted': {
    id: 'overleaf-selfhosted',
    title: 'Self-Hosted Overleaf with Automated TrueNAS Backups',
    shortTitle: 'Self-Hosted Overleaf',
    description: 'A self-hosted Overleaf deployment for internal ETH use, with Docker Compose, an nginx HTTPS reverse proxy, automated setup scripts, and TrueNAS backups.',
    backgroundImage: '/overleaf/image.png',
  },
} as const satisfies Record<string, Pick<Project, 'id' | 'title' | 'shortTitle' | 'description' | 'backgroundImage'>>;

export type ProjectId = keyof typeof projectSummaries;

export function getProjectSummary(id: string) {
  return Object.values(projectSummaries).find(project => project.id === id);
}

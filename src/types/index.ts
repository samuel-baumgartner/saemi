import type { ReactNode } from 'react';

export type CarouselItemType = 'image' | 'video' | 'model' | 'custom';

export interface CarouselItem {
  type: CarouselItemType;
  /** Required for image / video / model slides */
  src?: string;
  /** Used when type is 'custom' */
  content?: ReactNode;
  caption?: string;
}

export interface ProjectTag {
  label: string;
  color?: string;
}

export interface ProjectMetadata {
  location?: string;
  date?: string;
  teamSize?: string;
  place?: string;
  earnings?: string;
}

export interface TechStackItem {
  category: string;
  technology: string;
  color?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  color?: string;
  image?: string;
}

export interface ProjectSection {
  title: string;
  content: React.ReactNode;
  gradient?: string;
  bgColor?: string;
}

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  type: 'hackathon' | 'personal';
  tags: ProjectTag[];
  metadata: ProjectMetadata;
  backgroundImage?: string;
  carouselItems: CarouselItem[];
  headerContent: React.ReactNode;
  content: React.ReactNode;
}

export interface EducationItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgColor: 'light' | 'dark';
}

export interface PersonalInfo {
  name: string;
  title: string;
  university: string;
  universityUrl: string;
  interests: string;
  about: string[];
}



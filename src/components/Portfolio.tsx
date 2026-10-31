"use client";

import ScrollBackground from "@/components/ScrollBackground";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import { useModal } from "@/hooks/useModal";
import { personalInfo } from "@/data/personalInfo";
import { educationItems } from "@/data/education";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { Project, EducationItem } from "@/types";

const EducationModal = dynamic(() => import('@/components/EducationModal'));

export default function Portfolio() {
  const { modalState, openModal, closeModal } = useModal();

  const handleOpenProject = (project: Project) => {
    openModal(
      project.title,
      project.description,
      undefined,
      project.content,
      project.headerContent,
      project.carouselItems
    );
  };

  const handleOpenRemoteBallProject = () => {
    // Find the remote-ball project
    const remoteBallProject = projects.find(p => p.id === 'remote-ball');
    if (remoteBallProject) {
      // Find the project card element directly
      const projectCard = document.querySelector(`[data-project-id="${remoteBallProject.id}"]`) as HTMLElement;
      if (projectCard) {
        // Scroll card into view with a slight offset from top
        const cardRect = projectCard.getBoundingClientRect();
        const scrollY = window.scrollY + cardRect.top - (window.innerHeight * 0.3);
        window.scrollTo({ top: Math.max(0, scrollY), behavior: 'smooth' });

        // Add highlight animation with a ring effect after scroll
        setTimeout(() => {
          projectCard.style.transition = 'all 0.5s ease-in-out';
          projectCard.style.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3)';
          projectCard.style.transform = 'scale(1.05)';

          // Remove highlight after animation (but don't open modal)
          setTimeout(() => {
            projectCard.style.boxShadow = '';
            projectCard.style.transform = '';
          }, 1500);
        }, 300);
      }
    }
  };

  const handleOpenEducation = (item: EducationItem) => {
    openModal(item.title, item.description);
  };

  return (
    <>
      <a href="#about" className="portfolio-skip-link">Skip to main content</a>
      <ScrollBackground />
      <main className="portfolio relative min-h-screen">
        <HeroSection personalInfo={personalInfo} onOpenRemoteBallProject={handleOpenRemoteBallProject} />
        <AboutSection personalInfo={personalInfo} />
        <EducationSection
          educationItems={educationItems}
          onOpenModal={handleOpenEducation}
        />
        <ProjectsSection projects={projects} onOpenProject={handleOpenProject} />
        <SkillsSection skills={skills} />
        <ContactSection />

        {modalState.isOpen && <EducationModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.title}
          description={modalState.description}
          images={modalState.images}
          carouselItems={modalState.carouselItems}
          content={modalState.content}
          headerContent={modalState.headerContent}
        />}

      </main>
    </>
  );
}

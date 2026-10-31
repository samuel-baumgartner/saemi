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
import { EducationItem } from "@/types";

const EducationModal = dynamic(() => import('@/components/EducationModal'));

export default function Portfolio() {
  const { modalState, openModal, closeModal } = useModal();

  const handleOpenEducation = (item: EducationItem) => {
    openModal(item.title, item.description);
  };

  return (
    <>
      <a href="#about" className="portfolio-skip-link">Skip to main content</a>
      <ScrollBackground />
      <main className="portfolio relative min-h-screen">
        <HeroSection personalInfo={personalInfo} />
        <AboutSection personalInfo={personalInfo} />
        <EducationSection
          educationItems={educationItems}
          onOpenModal={handleOpenEducation}
        />
        <ProjectsSection projects={projects} />
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

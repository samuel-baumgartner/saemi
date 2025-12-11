"use client";

import React, { useEffect } from "react";
import ScrollBackground from "@/components/ScrollBackground";
import EducationModal from "@/components/EducationModal";
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

export default function Home() {
  const { modalState, openModal, closeModal } = useModal();

  // Prevent scrolling past ContactSection
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.querySelector('#contact');
      if (!contactSection) return;

      const contactRect = contactSection.getBoundingClientRect();
      const contactBottom = contactRect.bottom + window.scrollY;
      const currentScroll = window.scrollY + window.innerHeight;

      // If we've scrolled past the contact section, prevent further scrolling
      if (currentScroll > contactBottom) {
        const maxScroll = contactBottom - window.innerHeight;
        window.scrollTo(0, maxScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleOpenEducation = (item: EducationItem) => {
    openModal(item.title, item.description);
  };

  return (
    <>
      <ScrollBackground />
      <main className="relative min-h-screen">
        <HeroSection personalInfo={personalInfo} />
        <AboutSection personalInfo={personalInfo} />
        <EducationSection
          educationItems={educationItems}
          onOpenModal={handleOpenEducation}
        />
        <ProjectsSection projects={projects} onOpenProject={handleOpenProject} />
        <SkillsSection skills={skills} />
        <ContactSection />

        <EducationModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.title}
          description={modalState.description}
          images={modalState.images}
          carouselItems={modalState.carouselItems}
          content={modalState.content}
          headerContent={modalState.headerContent}
        />

      </main>
    </>
  );
}

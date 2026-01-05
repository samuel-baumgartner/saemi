import { useState } from 'react';
import { CarouselItem } from '@/types';

export interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  images?: string[];
  carouselItems?: CarouselItem[];
  content?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export function useModal() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    description: '',
  });

  const openModal = (
    title: string,
    description: string,
    images?: string[],
    content?: React.ReactNode,
    headerContent?: React.ReactNode,
    carouselItems?: CarouselItem[]
  ) => {
    setModalState({
      isOpen: true,
      title,
      description,
      images,
      content,
      headerContent,
      carouselItems,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      title: '',
      description: '',
    });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
}
















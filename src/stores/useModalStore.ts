import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  title: string;
  content: string;
  type: 'readme' | 'generic';
  openModal: (title: string, content: string, type?: 'readme' | 'generic') => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: '',
  content: '',
  type: 'generic',
  openModal: (title, content, type = 'generic') => 
    set({ isOpen: true, title, content, type }),
  closeModal: () => 
    set({ isOpen: false, title: '', content: '', type: 'generic' }),
}));
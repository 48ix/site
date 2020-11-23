import { createState, useState } from '@hookstate/core';

interface JoinForm {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  onToggle(): void;
}

type JoinTerm = 'annual' | 'monthly';

const joinFormState = createState<boolean>(false);
const joinFormTerm = createState<JoinTerm>('annual');
const toc = createState<boolean>(false);

export const useJoinForm = (): JoinForm => {
  const state = useState<boolean>(joinFormState);
  return {
    isOpen: state.value,
    onOpen: () => state.set(true),
    onClose: () => state.set(false),
    onToggle: () => state.set(p => !p),
  };
};

export const useJoinTerm = () => {
  const state = useState(joinFormTerm);
  return {
    term: state.value,
    setTerm: (term: JoinTerm) => state.set(term),
  };
};

export const useToc = () => {
  const state = useState(toc);
  return {
    hidden: state.value,
    show: () => state.set(true),
    hide: () => state.set(false),
    toggle: () => state.set(p => !p),
  };
};

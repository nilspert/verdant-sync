import { useState } from 'react';

export function useModal() {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return { isVisible, showModal, hideModal };
}

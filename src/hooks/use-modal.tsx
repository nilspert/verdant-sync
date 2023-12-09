/**
 * File: use-modal.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains hook definition for useModal.
 * Simple handler hook for modal visibility
 */
import { useState } from 'react';

// Component definition and export
export function useModal() {
  // State variable for modal visibility
  const [isVisible, setIsVisible] = useState(false);

  // Function for hiding and showing modal
  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return { isVisible, showModal, hideModal };
}

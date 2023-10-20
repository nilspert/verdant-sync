/**
 * File: toast.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for Toast.
 * Toast is used to display short feedback to the user of successfull or failed operation
 * Uses react-native-simple-toast package
 */

import React from 'react';
import SimpleToast from 'react-native-simple-toast';

// Toast props
interface ToastProps {
  message: string;
}

// Component definition
const Toast: React.FC<ToastProps> = ({ message }) => {
  SimpleToast.showWithGravity(message, SimpleToast.LONG, SimpleToast.TOP);

  return null;
};

// Export Toast component
export default Toast;

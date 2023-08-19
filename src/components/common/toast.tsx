import React from 'react';
import SimpleToast from 'react-native-simple-toast';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  SimpleToast.showWithGravity(message, SimpleToast.LONG, SimpleToast.TOP);

  return null;
};

export default Toast;

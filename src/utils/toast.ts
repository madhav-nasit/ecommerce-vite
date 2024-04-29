import { toast } from 'react-toastify';

/** Function to show a success toast message */
export const showSuccessToast = ({ message }: { message: string }): void => {
  // Display a success toast with the provided message
  toast.success(message);
};

/** Function to show a error toast message */
export const showErrorToast = ({ message }: { message: string }): void => {
  // Display a error toast with the provided message
  toast.error(message);
};

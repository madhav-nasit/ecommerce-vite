import { strings } from 'constants';
import React from 'react';

interface DeleteConfirmProps {
  /** The heading/title of the confirmation dialog. */
  heading: string;
  /** The message/body of the confirmation dialog. */
  message: string;
  /** Function to be called when the delete button is clicked. */
  onDelete?: () => void;
  /** Function to be called when the cancel button is clicked. */
  onCancel?: () => void;
}

/**
 * DeleteConfirm Component
 * A confirmation dialog for deleting an item or canceling an action.
 */
export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  heading,
  message,
  onDelete,
  onCancel,
}) => {
  const {
    primary: { cart },
  } = strings;
  /** Handle delete callback */
  const handleDelete = () => {
    onDelete && onDelete();
  };

  /** Handle cancel callback */
  const handleCancel = () => {
    onCancel && onCancel();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='rounded-lg bg-white p-8 shadow-lg'>
        <h2 className='mb-4 text-lg font-bold'>{heading}</h2>
        <p className='mb-6 text-gray-700'>{message}</p>
        <div className='flex justify-end'>
          <button
            className='mr-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
            onClick={handleDelete}
          >
            {cart.delete}
          </button>
          <button
            className='rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400'
            onClick={handleCancel}
          >
            {cart.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

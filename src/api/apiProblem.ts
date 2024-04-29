import { strings } from 'constants';
import { showErrorToast } from 'utils';

const { apiErrors } = strings;

/**
 * Attempts to get a common cause of problems from an API response.
 *
 * @param error The API error response.
 */
export const getGeneralApiProblem = (error: any, onLogout: () => void) => {
  const { code, response } = error;

  // Check if the error code indicates a timeout
  switch (code) {
    case 'ECONNABORTED':
      showErrorToast({ message: apiErrors.requestTimeout });
      return { success: false, message: apiErrors.requestTimeout };
    // Check if the error code indicates a network error
    case 'ERR_NETWORK':
      showErrorToast({ message: apiErrors.networkError });
      return { success: false, message: apiErrors.networkError };
    // Check if the error code indicates a canceled request
    case 'ERR_CANCELED':
      showErrorToast({ message: apiErrors.requestCanceled });
      return { success: false, message: apiErrors.requestCanceled };
    // Handle other error codes
    default:
      return handleResponseError(response, onLogout);
  }
};

/**
 * Handles errors from API responses.
 *
 * @param response The API response error.
 */
const handleResponseError = (response: any, onLogout: () => void) => {
  // If there is no response, treat it as an unexpected error
  if (!response) {
    showErrorToast({ message: apiErrors.unexpectedError });
    return { success: false, message: apiErrors.unexpectedError };
  }

  const {
    status,
    data,
    data: { message },
  } = response;

  switch (status) {
    // Handle Unauthorized Access (e.g., redirect to login)
    case 401:
      // Logout user
      onLogout();
      return {
        ...data,
        status,
        success: false,
        message: apiErrors.unauthorizedAccess,
      };
    // Handle Forbidden Access
    case 403:
      showErrorToast({ message: apiErrors.forbiddenAccess });
      return {
        ...data,
        status,
        success: false,
        message: apiErrors.forbiddenAccess,
      };
    // Handle Bad Request with or without a specific error message
    case 400:
      showErrorToast({
        message: !!message ? message : apiErrors.badRequest,
      });
      return data?.message
        ? { ...data, status, success: false }
        : { ...data, status, success: false, message: apiErrors.badRequest };
    // Handle Not Found Error
    case 404:
      showErrorToast({ message: apiErrors.resourceNotFound });
      return {
        ...data,
        status,
        success: false,
        message: apiErrors.resourceNotFound,
      };
    // Handle Internal Server Error
    case 500:
      showErrorToast({ message: apiErrors.internalServerError });
      return {
        ...data,
        status,
        success: false,
        message: apiErrors.internalServerError,
      };
    // Handle other HTTP errors
    default:
      showErrorToast({ message: apiErrors.unexpectedError });
      return {
        ...data,
        status,
        success: false,
        message: apiErrors.unexpectedError,
      };
  }
};

import { strings } from 'constants';
import { showErrorToast } from 'utils';

const { apiErrors } = strings;

/**
 * Attempts to get a common cause of problems from an API response.
 *
 * @param error The API error response.
 */
export const getGeneralApiProblem = (error: any) => {
  const { code, response } = error;

  // Check if the error code indicates a timeout
  switch (code) {
    case 'ECONNABORTED':
      showErrorToast({ message: apiErrors.requestTimeout });
      return { status: false, message: apiErrors.requestTimeout };
    // Check if the error code indicates a network error
    case 'ERR_NETWORK':
      showErrorToast({ message: apiErrors.networkError });
      return { status: false, message: apiErrors.networkError };
    // Check if the error code indicates a canceled request
    case 'ERR_CANCELED':
      showErrorToast({ message: apiErrors.requestCanceled });
      return { status: false, message: apiErrors.requestCanceled };
    // Handle other error codes
    default:
      return handleResponseError(response);
  }
};

/**
 * Handles errors from API responses.
 *
 * @param response The API response error.
 */
const handleResponseError = (response: any) => {
  // If there is no response, treat it as an unexpected error
  if (!response) {
    showErrorToast({ message: apiErrors.unexpectedError });
    return { status: false, message: apiErrors.unexpectedError };
  }

  const {
    status,
    data,
    data: { message },
  } = response;

  switch (status) {
    // Handle Unauthorized Access (e.g., redirect to login)
    case 401:
      // TODO: Logout user here
      showErrorToast({ message: apiErrors.unauthorizedAccess });
      return {
        ...data,
        status: false,
        message: apiErrors.unauthorizedAccess,
      };
    // Handle Forbidden Access
    case 403:
      showErrorToast({ message: apiErrors.forbiddenAccess });
      return {
        ...data,
        status: false,
        message: apiErrors.forbiddenAccess,
      };
    // Handle Bad Request with or without a specific error message
    case 400:
      showErrorToast({
        message: !!message ? message : apiErrors.badRequest,
      });
      return data?.message
        ? { ...data, status: false }
        : { ...data, status: false, message: apiErrors.badRequest };
    // Handle Not Found Error
    case 404:
      showErrorToast({ message: apiErrors.resourceNotFound });
      return {
        ...data,
        status: false,
        message: apiErrors.resourceNotFound,
      };
    // Handle Internal Server Error
    case 500:
      showErrorToast({ message: apiErrors.internalServerError });
      return {
        ...data,
        status: false,
        message: apiErrors.internalServerError,
      };
    // Handle other HTTP errors
    default:
      showErrorToast({ message: apiErrors.unexpectedError });
      return {
        ...data,
        status: false,
        message: apiErrors.unexpectedError,
      };
  }
};

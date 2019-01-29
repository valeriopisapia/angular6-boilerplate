export const TIMEOUT_ERROR = "TIMEOUT_ERROR";
export const OFFLINE_ERROR = "OFFLINE_ERROR";

// Generic helper to build error action creators
export function createError(type) {
  return function errorCreator(message) {
    return {
      type,
      message: message && message.toString()
    };
  };
}

// System-wide errors

export const timeoutError = createError(TIMEOUT_ERROR);

export const offlineError = createError(OFFLINE_ERROR);

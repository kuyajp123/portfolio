/**
 * Safe sessionStorage helper with JSON serialization and error resilience.
 */

export const getSessionCache = (key: string): unknown => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
};

export const setSessionCache = (key: string, data: unknown): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Gracefully ignore storage quota exceeded or private-mode errors
  }
};

export const removeSessionCache = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
};

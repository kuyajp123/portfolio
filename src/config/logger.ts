// logger.ts
export const logger = {
  log: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },

  error: (...args: unknown[]) => {
    console.error(...args); // Keep errors in production
  },

  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
};

export const logger = {
  info: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[INFO]', ...args);
    }
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[WARN]', ...args);
    }
  },
}; 
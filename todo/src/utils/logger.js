const logger = {
    log: (...args) => {
      if (import.meta.env.TODO_APP_ENV !== 'production') {
        console.log(...args);
      }
    },
  
    info: (...args) => {
      if (import.meta.env.TODO_APP_ENV !== 'production') {
        console.info(...args);
      }
    },
  
    warn: (...args) => {
      if (import.meta.env.TODO_APP_ENV !== 'production') {
        console.warn(...args);
      }
    },
  
    error: (...args) => {
      if (import.meta.env.TODO_APP_ENV !== 'production') {
        console.error(...args);
      }
    }
  };
  
  export default logger;
  
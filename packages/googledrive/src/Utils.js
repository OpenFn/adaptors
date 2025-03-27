export function logError(err) {
    const { code, errors, response } = err;
    if (code && errors && response) {
      console.error('Drive API Error:', errors);
      const { statusText, config } = response;
      const { url, method } = config;
      console.error(`${method} ${url} - ${code}:${statusText}`);
    }
    console.error('Error Details:', err.message);
  }
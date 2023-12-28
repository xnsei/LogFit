const baseURL =
  JSON.stringify(import.meta.env.VITE_BASEURL).replace(/["']/g, "") ||
  "http://localhost:8000";

// const baseURL = "http://localhost:8000";

export default baseURL;

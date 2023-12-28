const baseURL = import.meta.env.VITE_BASEURL ? JSON.stringify(import.meta.env.VITE_BASEURL).replace(/["']/g, "") : "http://localhost:8000";

export default baseURL;

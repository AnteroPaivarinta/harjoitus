const mode = import.meta.env.MODE;

export const API_URL =
  mode === "cloud"
    ? "http://20.82.239.59:3000/api/dashboard"
    : "http://localhost:3000/api/dashboard";
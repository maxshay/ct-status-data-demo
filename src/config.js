let config;

if (process.env.NODE_ENV === "development") {
  config = {
    statusesApi: "http://127.0.0.1:5000/api/5000/statuses",
    downloadLink: "http://127.0.0.1:5000/api/5000/download",
  };
} else {
  config = {
    statusesApi: "/api/5000/statuses",
    downloadLink: "/api/5000/download",
  };
}

export default config;

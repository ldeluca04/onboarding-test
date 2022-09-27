import axios from "axios";
import env from "@architecture-it/react-env";

export const configuration = {
  baseURL: env("BASE_URL"),
};

export const instance = axios.create(configuration);

instance.interceptors.request.use((configuration) => {
  const token = localStorage.getItem("token");

  if (token) {
    configuration = {
      ...configuration,
      headers: {
        ...configuration.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return configuration;
});

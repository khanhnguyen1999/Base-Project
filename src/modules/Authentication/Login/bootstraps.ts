import { ModuleConfig } from "@core/interfaces";

const config: ModuleConfig = {
  name: "Authentication",
  baseUrl: "",
  routes: [
    {
      path: "/admin/login",
      page: "AdminLogin",
      title: "Admin Login",
      exact: true,
    },
  ],
  requireAuthenticated: false,
};

export default config;

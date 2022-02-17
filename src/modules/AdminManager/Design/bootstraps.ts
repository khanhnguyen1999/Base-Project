import { ModuleConfig } from "@core/interfaces";
import { name as banners } from "./reducers/banners";
import { name as popups } from "./reducers/popups";
const config: ModuleConfig = {
  name: "Design",
  baseUrl: "/admin",
  role: "admin",
  routes: [
    {
      path: "/design",
      page: "index",
      title: "Design Manager",
      exact: true,
      subPath: [
        {
          path: "/banner",
          subPage: "BannerManagement",
          page: "BannerManagement",
          title: "Banner Management",
          exact: true,
          reducer: {
            name: banners,
            resource: "banners",
          },
        },
        {
          path: "/banner/:id",
          subPage: "BannerManagement",
          page: "BannerRegister",
          title: "Create banner",
          exact: true,
        },
        {
          path: "/popup",
          subPage: "PopupManagement",
          page: "PopupManagement",
          title: "Popup Management",
          exact: true,
          reducer: {
            name: popups,
            resource: "popups",
          },
        },
        {
          path: "/popup/:id",
          subPage: "PopupManagement",
          page: "PopupRegister",
          title: "Create popup",
          exact: true,
        },
      ],
    },
  ],
  requireAuthenticated: true,
};

export default config;

import { ModuleConfig } from "@core/interfaces";
import { name as membermanagement } from "./reducers/member-management";
import { name as storebussiness } from "./reducers/store-bussiness";

const config: ModuleConfig = {
  name: "Member",
  baseUrl: "/admin",
  role: "admin",
  routes: [
    {
      path: "/member",
      // subPage: "MemberManagement",
      page: "index",
      title: "Admin Member Manager",
      exact: true,
      subPath: [
        {
          path: "/member-management",
          subPage: "MemberManagement",
          page: "MemberManagement",
          title: "Admin Member Management",
          exact: true,
          reducer: {
            name: membermanagement,
            resource: "member-management",
          },
        },
        {
          path: "/member-management/:id",
          subPage: "MemberManagement",
          page: "MemberManagementRegister",
          title: "Create Member",
          exact: true,
        },
        {
          path: "/storemanager",
          subPage: "StoreBussiness",
          page: "StoreBussiness",
          title: "Admin Store Management",
          exact: true,
          reducer: {
            name: storebussiness,
            resource: "store-bussiness",
          },
        },
        {
          path: "/storemanager/:id",
          subPage: "StoreBussiness",
          page: "StoreRegister",
          title: "Create Store",
          exact: true,
        },
        {
          path: "/membership-levels",
          subPage: "MemberManagement",
          page: "MembershipLevels",
          title: "Create Membership Levels",
          exact: true,
        },
      ],
    },
  ],
  requireAuthenticated: true,
};

export default config;

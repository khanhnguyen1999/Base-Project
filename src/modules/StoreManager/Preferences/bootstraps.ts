import { ModuleConfig } from "@core/interfaces";
import { name as basicsetting } from "./reducers/basic-setting";

const config: ModuleConfig = {
  name: "Product",
  baseUrl: "/company",
  role: "company",
  routes: [
    {
      path: "/preferences",
      // subPage: "ProductManagement",
      page: "index",
      title: "Preferences",
      exact: true,
      subPath: [
        {
          path: "/shipping-basic-infor",
          page: "ShippingBasicInfor",
          title: "Shipping Basic Information",
          exact: true,
        },
        {
          path: "/product-usage-infor",
          page: "ProductUsageInfor",
          title: "Management of detailed product usage information",
          exact: true,
          reducer: {
            name: basicsetting,
            resource: "basic-setting",
          },
        },
        {
          path: "/product-usage-infor/:id",
          page: "ProductUsageRegister",
          title: "Manage Detailed Product Usage Guide",
          exact: true,
        },
      ],
    },
  ],
  requireAuthenticated: true,
};

export default config;

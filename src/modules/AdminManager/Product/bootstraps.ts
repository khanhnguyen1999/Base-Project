import { ModuleConfig } from "@core/interfaces";

const config: ModuleConfig = {
  name: "Product",
  baseUrl: "/admin",
  role: "admin",
  routes: [
    {
      path: "/product",
      page: "index",
      title: "Products",
      exact: true,
      subPath: [
        {
          path: "/brand",
          subPage: "CategoryManagement",
          page: "BrandManagement",
          title: "Brand Management",
          exact: true,
        },
        {
          path: "/categories",
          subPage: "CategoryManagement",
          page: "CategoryManagement",
          title: "Category Management",
          exact: true,
        },
        {
          path: "/product-management",
          subPage: "ProductManagement",
          page: "ProductManagement",
          title: "Product Management",
          exact: true,
        },
        {
          path: "/product-management/:id",
          subPage: "ProductManagement",
          page: "ProductRegistration",
          title: "Product Registration",
          exact: true,
        },
      ],
    },
  ],
  requireAuthenticated: true,
};

export default config;

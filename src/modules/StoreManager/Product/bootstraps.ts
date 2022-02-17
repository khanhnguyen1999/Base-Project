import { ModuleConfig } from "@core/interfaces";
import { name as products } from "./reducers/products";

const config: ModuleConfig = {
  name: "Product",
  baseUrl: "/company",
  role: "company",
  routes: [
    {
      path: "/product",
      // subPage: "ProductManagement",
      page: "index",
      title: "Product",
      exact: true,
      subPath: [
        {
          path: "/product-list",
          subPage: "ProductManagement",
          page: "ProductList",
          title: "Product List",
          exact: true,
          reducer: {
            name: products,
            resource: "products",
          },
        },
        {
          path: "/product-registration/:id",
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

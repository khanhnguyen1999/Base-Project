import { Layout } from "antd";
import React from "react";
import { Route } from "react-router";
import { STORE_PRODUCT_LIST } from "@core/constants/sidebar-menu";
import StoreSidebar from "@core/components/Sidebar/StoreManager";
import { lazy } from "react";
import { store } from "@root/App";
import useTranslate from "@core/hooks/useTranslate";

// const CustomComponent = () => {
//   console.log("custom");
//   return <div>text</div>;
// };
// const breadcrumbList = [
//   {
//     label: "common:products",
//   },
//   {
//     label: "sidebar:admin-product:category-management",
//   },
//   {
//     label: "sidebar:admin-product:category-management",
//   },
// ];
const { Sider } = Layout;
const Product = (props: any) => {
  const [t] = useTranslate();
  const loadListComponent = () => {
    const config = require("../bootstraps").default;
    return config;
  };
  const listComponent = loadListComponent();
  const ModuleFromName = (
    subPage: string,
    componentName: string,
    reducer: any,
  ) => {
    const lazyComponent = lazy(() =>
      import(
        `@modules/StoreManager/Product/pages/${
          subPage ? `${subPage}/${componentName}` : componentName
        }`
      ).then(async (component) => {
        if (reducer) {
          const m = await import(
            `@modules/StoreManager/Product/reducers/${reducer.resource}`
          );
          store.addReducer(reducer.name, m.default);
        }
        return component;
      }),
    );
    return lazyComponent;
  };

  const routes = listComponent.routes.find((item: any) => {
    return item.path.includes("/product");
  });
  return (
    <Layout>
      <Sider theme="light">
        <StoreSidebar
          title={t("common:products")}
          menuList={STORE_PRODUCT_LIST}
        />
      </Sider>
      <Layout>
        {routes.subPath
          ? routes.subPath.map((item: any) => {

            return (
              <Route
                key={`/company${routes.path}${item.path}`}
                exact={item.exact}
                path={`/company${routes.path}${item.path}`}
                component={ModuleFromName(
                  item.subPage,
                  item.page,
                  item.reducer,
                )}
              />
            );
          })
          : null}
      </Layout>
    </Layout>
  );
};
const areEqual = (prevProps: any, nextProps: any) => {
  return prevProps.location.pathname === nextProps.location.pathname;
};
export default React.memo(Product, areEqual);

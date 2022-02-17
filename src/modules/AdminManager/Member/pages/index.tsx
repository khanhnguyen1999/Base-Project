import { ADMIN_MEMBER_LIST } from "@core/constants/sidebar-menu";
import AdminSidebar from "@core/components/Sidebar/Admin";
import { Layout } from "antd";
import { Route } from "react-router";
import { lazy } from "react";
import { store } from "@root/App";
import useTranslate from "@core/hooks/useTranslate";
const { Sider } = Layout;


const Member = (props: any) => {
  const [t] = useTranslate();
  const loadListComponent = () => {
    const config = require("../bootstraps").default;
    return config;
  };
  const listComponent = loadListComponent();
  const ModuleFromName = (subPage: string, componentName: string, reducer: any) => {
    const lazyComponent = lazy(() =>
      import(
        `@modules/AdminManager/Member/pages/${subPage ? `${subPage}/${componentName}` : componentName}`
      ).then(async (component) => {
        if (reducer) {
          const m = await import(
            `@modules/AdminManager/Member/reducers/${reducer.resource}`
          );
          store.addReducer(reducer.name, m.default);
        }
        return component;
      }),
    );
    return lazyComponent;
  };
  const routes = listComponent.routes.find((item: any) => {
    return item.path.includes("/member");
  });
  return (
    <Layout>
      <Sider theme="light">
        <AdminSidebar
          title={t("menu:member-management")}
          menuList={ADMIN_MEMBER_LIST}
        />
      </Sider>
      <Layout>
        {
          routes.subPath
            ? routes.subPath.map((item: any) => {
              return (
                <Route
                  key={`/admin${routes.path}${item.path}`}
                  exact={item.exact}
                  path={`/admin${routes.path}${item.path}`}
                  component={ModuleFromName(item.subPage, item.page, item.reducer)}
                />
              );
            })
            : null
        }
      </Layout>
    </Layout>
  );
};

export default Member;

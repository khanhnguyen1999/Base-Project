import { Suspense, useEffect } from "react";
import { Switch, useHistory, useLocation } from "react-router";

import Auth from "@utils/helpers/auth";
import LoadableLoading from "./LoadableLoading";
import Path from "@utils/helpers/path";
import { RouteResource } from "@core/interfaces";
import RouteWithTitle from "./RouteWithTitle";

interface Props {
  routes: RouteResource[];
  authenticated: boolean;
}

const Routes = ({ routes, authenticated }: Props) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (authenticated) {
      if (location.pathname === "/") {
        console.log("redirect");
      }
      if (
        Auth.getRole() === "admin" &&
        Path.trim(location.pathname) === "admin"
      ) {
        history.push("/admin/product/brand");
      }
    }
  }, [authenticated]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    });

    return () => {
      unlisten();
    };
  }, [history]);
  return (
    <Suspense fallback={<LoadableLoading />}>
      <Switch>
        {routes.map((route) => {
          return (
            <RouteWithTitle key={route.path} {...route} />
          );
        })}
        <RouteWithTitle
          path="*"
          title="Not Found"
          module="NotFound"
          page="index"
          parentModule="System"
        />
      </Switch>
    </Suspense>
  );
};

Routes.defaultProps = {
  routes: [],
};

export default Routes;

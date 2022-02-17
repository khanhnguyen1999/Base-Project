import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "@core/components/ErrorBoundary";
import { Helmet } from "react-helmet-async";
import { Route } from "react-router";
import { RouteResource } from "@core/interfaces";
import { lazy } from "react";
import { store } from "@root/App";

const RouteWithTitle = ({
  exact,
  title,
  path,
  module,
  parentModule,
  subPage,
  page,
  reducer,
}: RouteResource) => {
  const lazyComponent = lazy(() =>
    import(
      /* webpackChunkName: "[request]" */
      `@modules/${parentModule}/${module}/pages/${subPage ? `${subPage}/${page}` : page}`
    ).then(async (component) => {
      if (reducer) {
        if (Array.isArray(reducer)) {
          const reducers = await Promise.all(
            reducer.map(async (r) => {
              const m = await import(
                /* webpackChunkName: "[request]" */
                `@modules/${parentModule}/${module}/reducers/${r.resource}`
              );

              return { name: r.name, default: m.default };
            }),
          );

          reducers.forEach((reducer) =>
            store.addReducer(reducer.name, reducer.default),
          );
        } else {
          const m = await import(
            /* webpackChunkName: "[request]" */
            `@modules/${parentModule}/${module}/reducers/${reducer.resource}`
          );

          store.addReducer(reducer.name, m.default);
        }
      }

      return component;
    }),
  );
  return (
    <ErrorBoundary>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <BrowserRouter>
        <Route exact={exact} path={path} component={lazyComponent} />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default RouteWithTitle;

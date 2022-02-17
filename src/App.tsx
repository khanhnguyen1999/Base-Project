import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Auth from "@utils/helpers/auth";
import Header from "@core/components/Header";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import LocaleContext from "@utils/contexts/Locale";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Resource from "@utils/helpers/resource";
import ResourceContext from "@utils/contexts/Resource";
import Routes from "@core/components/Init/Routes";
import configureStore from "@store/configureStore";
import { defaultResource } from "@core/constants/resource";

export const [store, persistor] = configureStore();

const App = () => {
  const [resource, setResource] = useState(defaultResource);
  const [locale, setLocale] = useState(localStorage.getItem("lang") || "en");
  const history = useHistory();
  const location = useLocation();

  const authenticated = Auth.authenticated();
  const resetRoutes = () => {
    setPageContext();
    setResourceContext();
    store.runSaga([]);
  };
  useEffect(() => {
    resetRoutes();
  }, [authenticated]);

  const setResourceContext = () => {
    return Resource.init(authenticated).then((resource) => {
      setResource(resource);
    });
  };

  const setPageContext = () => {
    const isLoginPage = location.pathname.includes("/login");
    if (authenticated && isLoginPage) return history.push("/");

    if (!authenticated) return history.push("/admin/login");
  };

  const setLocaleContext = (locale: string) => {
    setLocale(locale);
  };
  return resource.initiated ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <IntlProvider
            locale={locale}
            messages={resource.message[locale]}
            onError={(e) => console.log(e)}
          >
            <ResourceContext.Provider value={{ resource, setResourceContext }}>
              <LocaleContext.Provider value={{ locale, setLocaleContext }}>
                <div className="app">
                  <Header authenticated={resource.authenticated} />
                  <Routes
                    routes={resource.routes}
                    authenticated={resource.authenticated}
                  />
                </div>
              </LocaleContext.Provider>
            </ResourceContext.Provider>
          </IntlProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  ) : (
    <div>Loading...</div>
  );
};

export default App;

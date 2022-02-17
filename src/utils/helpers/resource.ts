import { ModuleConfig } from "@core/interfaces";
import Path from "@utils/helpers/path";
import cloneDeep from "lodash.clonedeep";
import { defaultResource } from "@core/constants/resource";
import parentModule from "@modules";

class Resource {
  public static async init(authenticated: boolean) {
    /**
     * @var {resource}
     * @property {initiated} // init state of application
     * @property {routes} // array router and page component of application
     * @property {message} // translate
     * @property {authenticated} // check user have authenticated yet
     * Ex value:
     * let resource = {
        initiated: false,
        routes: [],
        message: {
          en: messageEn,
        },
        authenticated: false,
      };
    */
    const resource = cloneDeep(defaultResource);

    for (let index = 0; index < parentModule.length; index++) {
      const modules = parentModule[index];

      for (let j = 0; j < modules.child.length; j++) {
        const module = modules.child[j];
        try {
          const config: ModuleConfig =
            require(`@modules/${modules.name}/${module}/bootstraps.ts`).default;

          if (
            config.requireAuthenticated === "any" ||
            config.requireAuthenticated === undefined ||
            config.requireAuthenticated === authenticated
          ) {
            for (let k = 0; k < config.routes.length; k++) {
              // eslint-disable-next-line prefer-const
              let { path, exact, subPath, ...rest } = config.routes[k];
              path = `${Path.trim(config.baseUrl)}/${Path.trim(path)}`;
              path = Path.trim(path);
              path = `/${path}`;

              let tempSubPath: any = [];
              if (subPath) {
                tempSubPath = subPath.map((sub) => `${path}${sub.path}`);
              }
              resource.routes.push({
                ...rest,
                module,
                parentModule: modules.name,
                exact: exact || false,
                path: tempSubPath.length === 0 ? path : tempSubPath,
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    resource.initiated = true;
    resource.authenticated = authenticated;
    return resource;
  }
}

export default Resource;

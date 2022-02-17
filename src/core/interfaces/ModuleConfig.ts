import { Role } from "./User";

interface ReducerConfig {
  name: string;
  resource: string;
}
export interface RouteSub {
  path: string;
  subPage?: string;
  page: string;
  title: string;
  exact?: boolean;
  reducer?: ReducerConfig[] | ReducerConfig;
}
export interface RouteConfig {
  path: string;
  subPath?: RouteSub[];
  subPage?: string;
  page: string;
  title: string;
  exact?: boolean;
  reducer?: ReducerConfig[] | ReducerConfig;
}

export interface RouteResource extends RouteConfig {
  module: string;
  parentModule?: string;
}

export interface ModuleConfig {
  name: string;
  baseUrl: string;
  role?: Role;
  routes: RouteConfig[];
  requireAuthenticated: boolean | "any";
}

export interface MenuConfig {
  path: string;
  key: string;
  label: string;
}

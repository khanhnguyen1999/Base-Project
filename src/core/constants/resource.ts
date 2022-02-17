import { RouteConfig } from "@core/interfaces";
import messageEn from "@utils/localization/en.json";
import messageKo from "@utils/localization/ko.json";

export interface RouteResource extends RouteConfig {
  module: string;
  parentModule?: string;
}

export interface Resource {
  initiated: boolean;
  routes: RouteResource[];
  message: { [key: string]: any };
  authenticated: boolean;
}

export const defaultResource: Resource = {
  initiated: false,
  routes: [],
  message: {
    en: messageEn,
    ko: messageKo,
  },
  authenticated: false,
};

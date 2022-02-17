import {
  ValuesAdminLoginForm,
  ValuesAdminSignupForm,
} from "@modules/Authentication/Login/interfaces";

import BaseService from "@core/class/BaseService";
import { Customer } from "@core/interfaces/Customer";

class AuthService extends BaseService {
  public adminLogin = (body: ValuesAdminLoginForm) => {
    return this.post("admin/auth/signin", body);
  };

  public storeManagerLogin = (body: ValuesAdminLoginForm) => {
    return this.post("company/auth/signin", body);
  };

  public adminLogout = () => {
    return this.post("admin/auth/logout");
  };

  public storeManagerLogout = () => {
    return this.post("company/auth/logout");
  };

  public adminSignup = (
    values: ValuesAdminSignupForm,
  ): Promise<{ token: string; data: Customer }> => {
    return this.post("admin/auth/signup", values);
  };
}

export default new AuthService("/", false);

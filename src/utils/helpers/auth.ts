import { Role } from "@core/interfaces";

class Auth {
  public static getToken() {
    return localStorage.getItem("token");
  }

  public static setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public static setRefreshToken(refreshToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  public static clearToken() {
    localStorage.removeItem("token");
    const persist = JSON.parse(localStorage.getItem("persist:root") || "{}");
    persist.user = {};
    localStorage.setItem("persist:root", JSON.stringify(persist));
  }

  public static clearRefreshToken() {
    localStorage.removeItem("refreshToken");
    const persist = JSON.parse(localStorage.getItem("persist:root") || "{}");
    persist.user = {};
    localStorage.setItem("persist:root", JSON.stringify(persist));
  }

  public static authenticated() {
    const token = Auth.getToken();

    if (token && token.includes("Bearer")) {
      return true;
    }

    return false;
  }

  public static getRole(): Role {
    const role = localStorage.getItem("role") as Role;
    return role;
  }

  public static setRole(role: Role) {
    localStorage.setItem("role", role);
  }

  public static clearRole() {
    localStorage.removeItem("role");
  }
}

export default Auth;

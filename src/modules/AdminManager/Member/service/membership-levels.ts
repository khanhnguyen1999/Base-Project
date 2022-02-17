import BaseService from "@core/class/BaseService";

class MembershipLevelsService extends BaseService {

  public getList = (params?: Record<string, any>) => {
    return this.get("", params);
  };

}

export default new MembershipLevelsService("/membershipLevels", true);

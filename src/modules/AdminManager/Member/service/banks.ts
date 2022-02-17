import BaseService from "@core/class/BaseService";

class BanksService extends BaseService {

  public getList = (params?: Record<string, any>) => {
    return this.get("", params);
  };

}

export default new BanksService("/banks", true);

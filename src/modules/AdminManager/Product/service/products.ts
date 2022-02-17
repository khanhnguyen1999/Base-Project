import BaseService from "@core/class/BaseService";

class BannersService extends BaseService {
  public getList = (params?: Record<string, any>) => {
    return this.get("", params);
  };

  public getOne = (id: string) => {
    return this.get(`/${id}`);
  };

  public create = (body: Record<string, any>) => {
    return this.post("", body);
  };

  public update = (body: Record<string, any>) => {
    return this.patch("", body);
  };

  public deleteByIds = (ids: string[]) => {
    return this.delete("/delete-by-ids", { ids });
  };
}

export default new BannersService("/company/products", true);

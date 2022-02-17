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

  public update = (id: string, body: Record<string, any>) => {
    return this.put(`/${id}`, body);
  };

  public deleteById = (id: string) => {
    return this.delete(`/${id}`);
  };

}

export default new BannersService("/banners", true);

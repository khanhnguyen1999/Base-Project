import BaseService from "@core/class/BaseService";

class BasicSettingService extends BaseService {
  public getList = (params?: Record<string, any>) => {
    return this.get("/config-product-guide", params);
  };

  public getOne = (id: string) => {
    return this.get(`/config-product-guide/${id}`);
  };

  public create = (body: Record<string, any>) => {
    return this.post("/config-product-guide", body);
  };

  public update = (id: string, body: Record<string, any>) => {
    return this.put(`/config-product-guide/${id}`, body);
  };

  public deleteById = (id: string) => {
    return this.delete(`/config-product-guide/${id}`);
  };
}

export default new BasicSettingService("/basic-setting", true);

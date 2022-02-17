import BaseService from "@core/class/BaseService";

class BrandsService extends BaseService {
  public getList = (params?: Record<string, any>) => {
    return this.get("", params);
  };

  public create = (body: Record<string, any>) => {
    return this.post("", body);
  };

  public update = (id: number, body: Record<string, any>) => {
    return this.patch(`/${id}`, body);
  };

  public unpublish = (ids: string[]) => {
    return this.put("/unpublish", { ids });
  };

  public publish = (ids: string[]) => {
    return this.put("/publish", { ids });
  };

  public deleteById = (id: string) => {
    return this.delete(`/${id}`);
  };
}

export default new BrandsService("/brands", true);

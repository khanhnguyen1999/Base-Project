import BaseService from "@core/class/BaseService";

class CategoriesService extends BaseService {
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
    return this.put(`/${body.id}`, body);
  };

  public move = (id: number, body: Record<string, any>) => {
    return this.patch(`/${String(id)}/move`, body);
  };

  public deleteById = (id: string) => {
    return this.delete(`/${id}`);
  };
}

export default new CategoriesService("/categories", true);

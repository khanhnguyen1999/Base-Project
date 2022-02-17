import BaseService from "@core/class/BaseService";

class MemberManagementService extends BaseService {

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
    return this.patch(`/${id}`, body);
  };

  public getAddress = (id: string) => {
    return this.get(`/${id}/addressBook`);
  };

  public deleteByIds = (ids: string[]) => {
    return this.delete("/delete-by-ids", { ids });
  };
  public deleteById = (id: string) => {
    return this.delete(`/${id}`);
  };
  public restore = (id: string) => {
    return this.patch(`/${id}/restore`);
  };

}

export default new MemberManagementService("/users", true);

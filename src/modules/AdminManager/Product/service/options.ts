import BaseService from "@core/class/BaseService";

class OptionsSetService extends BaseService {
  public getList = (common_option_set_id: number) => {
    const params = {
      filters: { common_option_set_id },
      sorter: ["sort", "ASC"],
    };

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

  public deleteById = (id: string) => {
    return this.delete("", { id });
  };
}

export default new OptionsSetService("/admin/common-options", true);

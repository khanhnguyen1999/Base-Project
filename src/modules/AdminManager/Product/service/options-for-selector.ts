import BaseService from "@core/class/BaseService";

class CategoriesService extends BaseService {

  public getCategories = (params?: Record<string, any>) => {
    return this.get("/categories", params);
  };

  public getBrands = (params?: Record<string, any>) => {
    return this.get("/brands", params);
  };
}

export default new CategoriesService("/subadmin/options-for-selector", true);

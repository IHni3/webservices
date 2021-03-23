import {
  IdentityManagementApi,
  Configuration,
} from "../IdentityManagementApi/";

let config = new Configuration();
config.basePath = "http://10.50.15.51/:6001";

let api = new IdentityManagementApi(config);

Object.freeze(api);
export default api;

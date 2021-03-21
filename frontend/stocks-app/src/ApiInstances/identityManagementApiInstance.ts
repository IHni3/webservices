import {
  IdentityManagementApi,
  Configuration,
} from "../IdentityManagementApi/";

let config = new Configuration();
config.basePath = "http://localhost:4000";

let api = new IdentityManagementApi(config);

Object.freeze(api);
export default api;

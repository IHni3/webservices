import { IdentityManagementApi, Configuration } from "./IdentityManagementApi/";

let config = new Configuration();
config.basePath = "https://localhost:8001";

let api = new IdentityManagementApi(config);

//Object.freeze(api);
export default api;

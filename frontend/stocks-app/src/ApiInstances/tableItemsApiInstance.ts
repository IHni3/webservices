import { Configuration, TableItemsApi } from "../GlueApi";

let config = new Configuration();
config.basePath = "http://10.50.15.51:6003";

let api = new TableItemsApi(config);

Object.freeze(api);
export default api;

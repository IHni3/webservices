import { Configuration, TableItemsApi } from "../GlueApi";

let config = new Configuration();
config.basePath = "http://localhost:4002";

let api = new TableItemsApi(config);

Object.freeze(api);
export default api;

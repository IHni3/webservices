import { Configuration, SearchItemsApi } from "../GlueApi";

let config = new Configuration();
config.basePath = "http://localhost:6003";

let api = new SearchItemsApi(config);

Object.freeze(api);
export default api;

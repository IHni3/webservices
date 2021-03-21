import { Configuration, SearchItemsApi } from "../GlueApi";

let config = new Configuration();
config.basePath = "http://hostess:4002";

let api = new SearchItemsApi(config);

Object.freeze(api);
export default api;

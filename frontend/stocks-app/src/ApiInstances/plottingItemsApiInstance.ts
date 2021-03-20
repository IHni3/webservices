import { Configuration, PlottingItemsApi } from "../GlueApi";

let config = new Configuration();
config.basePath = "http://localhost:4002";

let api = new PlottingItemsApi(config);

Object.freeze(api);
export default api;

import { ExchangeItemsApi, Configuration } from "../GlueApi";

let config = new Configuration();
config.basePath = "http://hostess:4002";

let api = new ExchangeItemsApi(config);

Object.freeze(api);
export default api;

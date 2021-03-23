import { Configuration, StocksApi } from "../StocksApi";

let config = new Configuration();
config.basePath = "http://localhost:6002";

let api = new StocksApi(config);

Object.freeze(api);
export default api;

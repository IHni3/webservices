import { Configuration, StocksApi } from "../StocksApi";

let config = new Configuration();
config.basePath = "http://localhost:4001";

let api = new StocksApi(config);

Object.freeze(api);
export default api;

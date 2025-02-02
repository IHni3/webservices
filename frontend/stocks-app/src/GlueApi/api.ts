/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Glue
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from "url";
import * as portableFetch from "portable-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "/".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = portableFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface ExchangeItem
 */
export interface ExchangeItem {
    /**
     * 
     * @type {string}
     * @memberof ExchangeItem
     */
    fromCurrencyCode?: string;
    /**
     * 
     * @type {string}
     * @memberof ExchangeItem
     */
    fromCurrencyName?: string;
    /**
     * 
     * @type {string}
     * @memberof ExchangeItem
     */
    currencyCode?: string;
    /**
     * 
     * @type {string}
     * @memberof ExchangeItem
     */
    toCurrencyName?: string;
    /**
     * 
     * @type {number}
     * @memberof ExchangeItem
     */
    exchangeRate?: number;
}
/**
 * 
 * @export
 * @interface OverviewItem
 */
export interface OverviewItem {
    /**
     * 
     * @type {string}
     * @memberof OverviewItem
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof OverviewItem
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof OverviewItem
     */
    price?: number;
    /**
     * 
     * @type {number}
     * @memberof OverviewItem
     */
    trend?: number;
    /**
     * 
     * @type {number}
     * @memberof OverviewItem
     */
    difference?: number;
    /**
     * 
     * @type {string}
     * @memberof OverviewItem
     */
    timeStamp?: string;
}
/**
 * 
 * @export
 * @interface PlottingItem
 */
export interface PlottingItem {
    /**
     * 
     * @type {number}
     * @memberof PlottingItem
     */
    price?: number;
    /**
     * 
     * @type {string}
     * @memberof PlottingItem
     */
    date?: string;
    /**
     * 
     * @type {string}
     * @memberof PlottingItem
     */
    symbol?: string;
}
/**
 * 
 * @export
 * @interface SearchItem
 */
export interface SearchItem {
    /**
     * 
     * @type {string}
     * @memberof SearchItem
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchItem
     */
    symbol?: string;
}
/**
 * 
 * @export
 * @interface TableItem
 */
export interface TableItem {
    /**
     * 
     * @type {string}
     * @memberof TableItem
     */
    period?: string;
    /**
     * 
     * @type {number}
     * @memberof TableItem
     */
    abs?: number;
    /**
     * 
     * @type {number}
     * @memberof TableItem
     */
    perAnno?: number;
}
/**
 * ExchangeItemsApi - fetch parameter creator
 * @export
 */
export const ExchangeItemsApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [currencyCode] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExchangeItemsPost(currencyCode?: string, options: any = {}): FetchArgs {
            const localVarPath = `/api/ExchangeItems`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (currencyCode !== undefined) {
                localVarQueryParameter['currencyCode'] = currencyCode;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ExchangeItemsApi - functional programming interface
 * @export
 */
export const ExchangeItemsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [currencyCode] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExchangeItemsPost(currencyCode?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ExchangeItem> {
            const localVarFetchArgs = ExchangeItemsApiFetchParamCreator(configuration).apiExchangeItemsPost(currencyCode, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * ExchangeItemsApi - factory interface
 * @export
 */
export const ExchangeItemsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {string} [currencyCode] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExchangeItemsPost(currencyCode?: string, options?: any) {
            return ExchangeItemsApiFp(configuration).apiExchangeItemsPost(currencyCode, options)(fetch, basePath);
        },
    };
};

/**
 * ExchangeItemsApi - object-oriented interface
 * @export
 * @class ExchangeItemsApi
 * @extends {BaseAPI}
 */
export class ExchangeItemsApi extends BaseAPI {
    /**
     * 
     * @param {string} [currencyCode] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExchangeItemsApi
     */
    public apiExchangeItemsPost(currencyCode?: string, options?: any) {
        return ExchangeItemsApiFp(this.configuration).apiExchangeItemsPost(currencyCode, options)(this.fetch, this.basePath);
    }

}
/**
 * OverviewItemsApi - fetch parameter creator
 * @export
 */
export const OverviewItemsApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOverviewItemsPost(token?: string, options: any = {}): FetchArgs {
            const localVarPath = `/api/OverviewItems`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (token !== undefined) {
                localVarQueryParameter['token'] = token;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * OverviewItemsApi - functional programming interface
 * @export
 */
export const OverviewItemsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOverviewItemsPost(token?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<OverviewItem>> {
            const localVarFetchArgs = OverviewItemsApiFetchParamCreator(configuration).apiOverviewItemsPost(token, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * OverviewItemsApi - factory interface
 * @export
 */
export const OverviewItemsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOverviewItemsPost(token?: string, options?: any) {
            return OverviewItemsApiFp(configuration).apiOverviewItemsPost(token, options)(fetch, basePath);
        },
    };
};

/**
 * OverviewItemsApi - object-oriented interface
 * @export
 * @class OverviewItemsApi
 * @extends {BaseAPI}
 */
export class OverviewItemsApi extends BaseAPI {
    /**
     * 
     * @param {string} [token] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OverviewItemsApi
     */
    public apiOverviewItemsPost(token?: string, options?: any) {
        return OverviewItemsApiFp(this.configuration).apiOverviewItemsPost(token, options)(this.fetch, this.basePath);
    }

}
/**
 * PlottingItemsApi - fetch parameter creator
 * @export
 */
export const PlottingItemsApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [symbol] 
         * @param {string} [intervall] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPlottingItemsPost(symbol?: string, intervall?: string, options: any = {}): FetchArgs {
            const localVarPath = `/api/PlottingItems`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
            }

            if (intervall !== undefined) {
                localVarQueryParameter['intervall'] = intervall;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PlottingItemsApi - functional programming interface
 * @export
 */
export const PlottingItemsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [symbol] 
         * @param {string} [intervall] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPlottingItemsPost(symbol?: string, intervall?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<PlottingItem>> {
            const localVarFetchArgs = PlottingItemsApiFetchParamCreator(configuration).apiPlottingItemsPost(symbol, intervall, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * PlottingItemsApi - factory interface
 * @export
 */
export const PlottingItemsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {string} [symbol] 
         * @param {string} [intervall] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPlottingItemsPost(symbol?: string, intervall?: string, options?: any) {
            return PlottingItemsApiFp(configuration).apiPlottingItemsPost(symbol, intervall, options)(fetch, basePath);
        },
    };
};

/**
 * PlottingItemsApi - object-oriented interface
 * @export
 * @class PlottingItemsApi
 * @extends {BaseAPI}
 */
export class PlottingItemsApi extends BaseAPI {
    /**
     * 
     * @param {string} [symbol] 
     * @param {string} [intervall] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlottingItemsApi
     */
    public apiPlottingItemsPost(symbol?: string, intervall?: string, options?: any) {
        return PlottingItemsApiFp(this.configuration).apiPlottingItemsPost(symbol, intervall, options)(this.fetch, this.basePath);
    }

}
/**
 * SearchItemsApi - fetch parameter creator
 * @export
 */
export const SearchItemsApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [search] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSearchItemsPost(search?: string, options: any = {}): FetchArgs {
            const localVarPath = `/api/SearchItems`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (search !== undefined) {
                localVarQueryParameter['search'] = search;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SearchItemsApi - functional programming interface
 * @export
 */
export const SearchItemsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [search] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSearchItemsPost(search?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<SearchItem>> {
            const localVarFetchArgs = SearchItemsApiFetchParamCreator(configuration).apiSearchItemsPost(search, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * SearchItemsApi - factory interface
 * @export
 */
export const SearchItemsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {string} [search] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSearchItemsPost(search?: string, options?: any) {
            return SearchItemsApiFp(configuration).apiSearchItemsPost(search, options)(fetch, basePath);
        },
    };
};

/**
 * SearchItemsApi - object-oriented interface
 * @export
 * @class SearchItemsApi
 * @extends {BaseAPI}
 */
export class SearchItemsApi extends BaseAPI {
    /**
     * 
     * @param {string} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SearchItemsApi
     */
    public apiSearchItemsPost(search?: string, options?: any) {
        return SearchItemsApiFp(this.configuration).apiSearchItemsPost(search, options)(this.fetch, this.basePath);
    }

}
/**
 * TableItemsApi - fetch parameter creator
 * @export
 */
export const TableItemsApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [id] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiTableItemsPost(id?: string, options: any = {}): FetchArgs {
            const localVarPath = `/api/TableItems`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TableItemsApi - functional programming interface
 * @export
 */
export const TableItemsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [id] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiTableItemsPost(id?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<TableItem>> {
            const localVarFetchArgs = TableItemsApiFetchParamCreator(configuration).apiTableItemsPost(id, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * TableItemsApi - factory interface
 * @export
 */
export const TableItemsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {string} [id] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiTableItemsPost(id?: string, options?: any) {
            return TableItemsApiFp(configuration).apiTableItemsPost(id, options)(fetch, basePath);
        },
    };
};

/**
 * TableItemsApi - object-oriented interface
 * @export
 * @class TableItemsApi
 * @extends {BaseAPI}
 */
export class TableItemsApi extends BaseAPI {
    /**
     * 
     * @param {string} [id] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TableItemsApi
     */
    public apiTableItemsPost(id?: string, options?: any) {
        return TableItemsApiFp(this.configuration).apiTableItemsPost(id, options)(this.fetch, this.basePath);
    }

}

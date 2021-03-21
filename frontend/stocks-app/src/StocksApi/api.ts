/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * My API
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
 * @interface ListRequest
 */
export interface ListRequest {
    /**
     * 
     * @type {string}
     * @memberof ListRequest
     */
    token?: string;
}
/**
 * 
 * @export
 * @interface ManipulationRequest
 */
export interface ManipulationRequest {
    /**
     * 
     * @type {string}
     * @memberof ManipulationRequest
     */
    token?: string;
    /**
     * 
     * @type {string}
     * @memberof ManipulationRequest
     */
    isin?: string;
}
/**
 * StocksApi - fetch parameter creator
 * @export
 */
export const StocksApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {ManipulationRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksAddPost(body?: ManipulationRequest, options: any = {}): FetchArgs {
            const localVarPath = `/stocks/add`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"ManipulationRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {ListRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksGetListPost(body?: ListRequest, options: any = {}): FetchArgs {
            const localVarPath = `/stocks/getList`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"ListRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {ManipulationRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksRemoveDelete(body?: ManipulationRequest, options: any = {}): FetchArgs {
            const localVarPath = `/stocks/remove`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"ManipulationRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * StocksApi - functional programming interface
 * @export
 */
export const StocksApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {ManipulationRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksAddPost(body?: ManipulationRequest, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = StocksApiFetchParamCreator(configuration).stocksAddPost(body, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {ListRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksGetListPost(body?: ListRequest, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = StocksApiFetchParamCreator(configuration).stocksGetListPost(body, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {ManipulationRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksRemoveDelete(body?: ManipulationRequest, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = StocksApiFetchParamCreator(configuration).stocksRemoveDelete(body, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * StocksApi - factory interface
 * @export
 */
export const StocksApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {ManipulationRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksAddPost(body?: ManipulationRequest, options?: any) {
            return StocksApiFp(configuration).stocksAddPost(body, options)(fetch, basePath);
        },
        /**
         * 
         * @param {ListRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksGetListPost(body?: ListRequest, options?: any) {
            return StocksApiFp(configuration).stocksGetListPost(body, options)(fetch, basePath);
        },
        /**
         * 
         * @param {ManipulationRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        stocksRemoveDelete(body?: ManipulationRequest, options?: any) {
            return StocksApiFp(configuration).stocksRemoveDelete(body, options)(fetch, basePath);
        },
    };
};

/**
 * StocksApi - object-oriented interface
 * @export
 * @class StocksApi
 * @extends {BaseAPI}
 */
export class StocksApi extends BaseAPI {
    /**
     * 
     * @param {ManipulationRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StocksApi
     */
    public stocksAddPost(body?: ManipulationRequest, options?: any) {
        return StocksApiFp(this.configuration).stocksAddPost(body, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {ListRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StocksApi
     */
    public stocksGetListPost(body?: ListRequest, options?: any) {
        return StocksApiFp(this.configuration).stocksGetListPost(body, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {ManipulationRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StocksApi
     */
    public stocksRemoveDelete(body?: ManipulationRequest, options?: any) {
        return StocksApiFp(this.configuration).stocksRemoveDelete(body, options)(this.fetch, this.basePath);
    }

}

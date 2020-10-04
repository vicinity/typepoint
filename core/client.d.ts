import { AxiosInstance } from 'axios';
import { Empty, EndpointDefinition, IsEmptyFieldName, NormalisedArrayOf } from './shared';
declare global {
    interface Object {
        [IsEmptyFieldName]: 'F';
    }
}
export interface TypePointClientResponse<TBody> {
    body: NormalisedArrayOf<TBody>;
    statusCode: number;
    statusText: string;
    headers: {
        [name: string]: string | undefined;
    };
    header(name: string): string | undefined;
}
export interface TypePointClientOptions {
    server?: string;
    axios?: AxiosInstance;
}
export declare type EndpointDefinitionWithNoParamsOrBody = EndpointDefinition<Empty, Empty, any>;
export declare type FetchParamsOptions<TRequestParams extends Object> = (TRequestParams extends Empty ? {} : {
    params: TRequestParams;
});
export declare type FetchBodyOptions<TRequestBody extends Object> = (TRequestBody extends Empty ? {} : {
    body: TRequestBody;
});
export declare type TypePointClientFetchOptions<TEndpointDefinition extends EndpointDefinition<any, any, any>> = (FetchParamsOptions<ReturnType<TEndpointDefinition['typeInfo']>['request']['params']> & FetchBodyOptions<ReturnType<TEndpointDefinition['typeInfo']>['request']['body']>);
export declare type RequestWithEmptyParamsAndBody<TEndpointDefinition extends EndpointDefinition<any, any, any>> = ((definition: TEndpointDefinition, options: TypePointClientFetchOptions<TEndpointDefinition>) => Promise<TypePointClientResponse<ReturnType<TEndpointDefinition['typeInfo']>['response']['body']>>);
export declare type RequestWithParamsOrBody<TEndpointDefinition extends EndpointDefinition<any, any, any>> = ((definition: TEndpointDefinition, options: TypePointClientFetchOptions<TEndpointDefinition>) => Promise<TypePointClientResponse<ReturnType<TEndpointDefinition['typeInfo']>['response']['body']>>);
export declare type RequestFunction<TEndpointDefinition extends EndpointDefinition<any, any, any>> = (RequestWithEmptyParamsAndBody<TEndpointDefinition> | RequestWithParamsOrBody<TEndpointDefinition>);
export declare class TypePointClientResponseError extends Error {
    response: TypePointClientResponse<any> | undefined;
    statusCode: number | undefined;
    statusText: string | undefined;
    constructor(message: string, response: TypePointClientResponse<any> | undefined);
}
export declare class TypePointClient {
    protected readonly axios: AxiosInstance;
    private readonly server;
    constructor(options?: TypePointClientOptions);
    fetch<TEndpointDefinition extends EndpointDefinitionWithNoParamsOrBody>(definition: TEndpointDefinition, options?: TypePointClientFetchOptions<TEndpointDefinition>): Promise<TypePointClientResponse<ReturnType<TEndpointDefinition['typeInfo']>['response']['body']>>;
    fetch<TEndpointDefinition extends EndpointDefinition<any, any, any>>(definition: TEndpointDefinition, options: TypePointClientFetchOptions<TEndpointDefinition>): Promise<TypePointClientResponse<ReturnType<TEndpointDefinition['typeInfo']>['response']['body']>>;
}

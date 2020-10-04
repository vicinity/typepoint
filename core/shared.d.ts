import { HttpMethod } from './shared/http';
import { PathBuildingFunction } from './shared/pathBuilder';
import { PathHelperParseMatch } from './shared/pathHelper';
export declare type Constructor<T> = new (...args: any[]) => T;
export declare const IsEmptyFieldName = " isEmpty ";
export declare class Empty {
    [IsEmptyFieldName]: 'T';
}
export interface ArrayOfTypeInfo<T> {
    element: T;
}
export declare class ArrayOfClassInfo<T> {
    readonly element: Constructor<T>;
    constructor(element: Constructor<T>);
}
export declare class DoNotReferenceTypeInfo extends Error {
    constructor(name: string);
}
export declare abstract class ArrayOf<T> {
    static isArrayOf: true;
    readonly classInfo?: ArrayOfClassInfo<T>;
    constructor(Class: Constructor<T>);
    typeInfo(): ArrayOfTypeInfo<T>;
}
export declare function arrayOf<T>(Class: Constructor<T>): Constructor<ArrayOf<T>>;
export declare function isArrayOf<T>(Class: Constructor<any>): Class is Constructor<ArrayOf<any>>;
export declare type NormalisedArrayOf<T> = T extends ArrayOf<infer TElementType> ? TElementType[] : T;
export interface EndpointDefinitionRequestTypeInfo<TParams, TBody> {
    params: NormalisedArrayOf<TParams>;
    body: NormalisedArrayOf<TBody>;
}
export interface EndpointDefinitionResponseTypeInfo<TBody> {
    body: NormalisedArrayOf<TBody>;
}
export interface EndpointDefinitionTypeInfo<TRequestParams, TRequestBody, TResponseBody> {
    request: EndpointDefinitionRequestTypeInfo<TRequestParams, TRequestBody>;
    response: EndpointDefinitionResponseTypeInfo<TResponseBody>;
}
export interface EndpointDefinitionUrlOptions<TRequestParams> {
    server?: string | undefined;
    params?: TRequestParams | undefined;
}
export interface BaseEndpointDefinitionOptions<TRequestParams extends Object | Empty, TRequestBody extends Object | Empty, TResponseBody extends Object | Empty> {
    method?: string;
    path: PathBuildingFunction<TRequestParams>;
}
export interface ClassBasedEndpointDefinitionOptions<TRequestParams extends Object | Empty, TRequestBody extends Object | Empty, TResponseBody extends Object | Empty> extends BaseEndpointDefinitionOptions<TRequestParams, TRequestBody, TResponseBody> {
    requestParams: Constructor<TRequestParams>;
    requestBody: Constructor<TRequestBody>;
    responseBody: Constructor<TResponseBody>;
}
export declare type EndpointDefinitionOptions<TRequestParams extends Object | Empty, TRequestBody extends Object | Empty, TResponseBody extends Object | Empty> = (BaseEndpointDefinitionOptions<TRequestParams, TRequestBody, TResponseBody> | ClassBasedEndpointDefinitionOptions<TRequestParams, TRequestBody, TResponseBody>);
export declare class EndpointDefinitionRequestClassInfo<TParams, TBody> {
    readonly params: Constructor<TParams>;
    readonly body: Constructor<TBody>;
    constructor(params: Constructor<TParams>, body: Constructor<TBody>);
}
export declare class EndpointDefinitionResponseClassInfo<TBody> {
    readonly body: Constructor<TBody>;
    constructor(body: Constructor<TBody>);
}
export declare class EndpointDefinitionClassInfo<TRequestParams extends Object | Empty, TRequestBody extends Object | Empty, TResponseBody> {
    readonly request: EndpointDefinitionRequestClassInfo<TRequestParams, TRequestBody>;
    readonly response: EndpointDefinitionResponseClassInfo<TResponseBody>;
    constructor(requestParams: Constructor<TRequestParams>, requestBody: Constructor<TRequestBody>, responseBody: Constructor<TResponseBody>);
}
export declare class EndpointDefinitionInvalidConstructorArgs extends Error {
    constructor(actualArguments: IArguments);
}
export declare class EndpointDefinition<TRequestParams extends Object | Empty, TRequestBody extends Object | Empty, TResponseBody extends Object | Empty> {
    readonly method: HttpMethod;
    readonly path: string;
    readonly classInfo?: EndpointDefinitionClassInfo<TRequestParams, TRequestBody, TResponseBody>;
    private pathHelper;
    constructor(buildPath: PathBuildingFunction<TRequestParams>);
    constructor(method: HttpMethod, buildPath: PathBuildingFunction<TRequestParams>);
    constructor(options: EndpointDefinitionOptions<TRequestParams, TRequestBody, TResponseBody>);
    typeInfo(): EndpointDefinitionTypeInfo<TRequestParams, TRequestBody, TResponseBody>;
    parse(url: string): PathHelperParseMatch | undefined;
    url(options?: EndpointDefinitionUrlOptions<TRequestParams>): string;
}
export declare type GetEndpointDefinitionRequestParams<TEndpointDefinition extends EndpointDefinition<any, any, any>> = ReturnType<TEndpointDefinition['typeInfo']>['request']['params'];
export declare type GetEndpointDefinitionRequestBody<TEndpointDefinition extends EndpointDefinition<any, any, any>> = ReturnType<TEndpointDefinition['typeInfo']>['request']['body'];
export declare type GetEndpointDefinitionResponseBody<TEndpointDefinition extends EndpointDefinition<any, any, any>> = ReturnType<TEndpointDefinition['typeInfo']>['response']['body'];

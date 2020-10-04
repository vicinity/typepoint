import { EndpointDefinition } from './shared';
import { Constructor } from './shared';
import { HttpMethod } from './shared/http';
import { PathHelperParseMatch } from './shared/pathHelper';
export interface RequestCookies {
    [name: string]: string | undefined;
}
export interface RequestHeaders {
    'accept'?: string;
    'access-control-allow-origin'?: string;
    'access-control-allow-credentials'?: string;
    'access-control-expose-headers'?: string;
    'access-control-max-age'?: string;
    'access-control-allow-methods'?: string;
    'access-control-allow-headers'?: string;
    'accept-patch'?: string;
    'accept-ranges'?: string;
    'age'?: string;
    'allow'?: string;
    'alt-svc'?: string;
    'cache-control'?: string;
    'connection'?: string;
    'content-disposition'?: string;
    'content-encoding'?: string;
    'content-language'?: string;
    'content-length'?: string;
    'content-location'?: string;
    'content-range'?: string;
    'content-type'?: string;
    'date'?: string;
    'expires'?: string;
    'host'?: string;
    'last-modified'?: string;
    'location'?: string;
    'pragma'?: string;
    'proxy-authenticate'?: string;
    'public-key-pins'?: string;
    'retry-after'?: string;
    'set-cookie'?: string[];
    'strict-transport-security'?: string;
    'trailer'?: string;
    'transfer-encoding'?: string;
    'tk'?: string;
    'upgrade'?: string;
    'vary'?: string;
    'via'?: string;
    'warning'?: string;
    'www-authenticate'?: string;
    [name: string]: string | string[] | undefined;
}
export interface Request<TRequestParams, TRequestBody> {
    readonly method: HttpMethod;
    readonly url: string;
    params: TRequestParams;
    body: TRequestBody;
    readonly cookies: RequestCookies;
    readonly headers: RequestHeaders;
    readonly signedCookies: RequestCookies;
    cookie(name: string): string | undefined;
    header(name: string): string | string[] | undefined;
    signedCookie(name: string): string | undefined;
}
export declare class HeadersAlreadySent extends Error {
    constructor(message?: string);
}
export interface ResponseHeaders {
    [name: string]: string | string[] | number | undefined;
}
export interface SetCookieOptions {
    maxAge?: number;
    signed?: boolean;
    expires?: Date | boolean;
    httpOnly?: boolean;
    path?: string;
    domain?: string;
    secure?: boolean | 'auto';
    encode?: (val: string) => void;
    sameSite?: boolean | string;
}
export declare type ResponseContentType = 'application/json' | string;
export interface Response<TResponseBody> {
    statusCode: number | undefined;
    contentType: ResponseContentType;
    body: TResponseBody | undefined;
    readonly hasFlushedHeaders: boolean;
    readonly hasFlushed: boolean;
    flush(): void;
    flushHeaders(): void;
    cookie(name: string, value: string, options?: SetCookieOptions): void;
    clearCookie(name: string, options?: SetCookieOptions): void;
    header(name: string): string | string[] | number | undefined;
    header(name: string, value: string | string[] | number | undefined): void;
    headers(): ResponseHeaders;
}
export interface EndpointContextCustomMetadata {
}
export interface EndpointContext<TRequestParams, TRequestBody, TResponseBody> {
    meta: EndpointContextCustomMetadata;
    request: Request<TRequestParams, TRequestBody>;
    response: Response<TResponseBody>;
}
export declare type EndpointContextFromDefinition<TEndpointDefinition extends EndpointDefinition<any, any, any>> = EndpointContext<ReturnType<TEndpointDefinition['typeInfo']>['request']['params'], ReturnType<TEndpointDefinition['typeInfo']>['request']['body'], ReturnType<TEndpointDefinition['typeInfo']>['response']['body']>;
export declare type EndpointHandlerFunction<TEndpointDefinition extends EndpointDefinition<any, any, any>> = (context: EndpointContext<ReturnType<TEndpointDefinition['typeInfo']>['request']['params'], ReturnType<TEndpointDefinition['typeInfo']>['request']['body'], ReturnType<TEndpointDefinition['typeInfo']>['response']['body']>, next: () => Promise<void>) => Promise<void> | void;
export interface IEndpointHandler {
    readonly name: string;
    readonly definition?: EndpointDefinition<any, any, any>;
    match?: (request: {
        method: string;
        url: string;
    }) => PathHelperParseMatch | undefined;
    handle(context: EndpointContext<any, any, any>, next: () => Promise<void>): Promise<void> | void;
}
export declare class CannotRedefineHandlerDefinition extends Error {
    constructor();
}
export declare abstract class EndpointHandler implements IEndpointHandler {
    definition: EndpointDefinition<any, any, any>;
    private _definition;
    private _isDefining;
    private handler;
    private pathHelper;
    readonly name: string;
    match(request: {
        method: string;
        url: string;
    }): PathHelperParseMatch | undefined;
    handle(context: EndpointContext<any, any, any>, next: () => Promise<void>): Promise<void>;
    protected define<TEndpointDefinition extends EndpointDefinition<any, any, any>>(definition: TEndpointDefinition, handler: EndpointHandlerFunction<TEndpointDefinition>): void;
}
export declare type EndpointHandlerClass = Constructor<EndpointHandler>;
export declare function defineHandler<TEndpointDefinition extends EndpointDefinition<any, any, any>>(definition: TEndpointDefinition, handler: EndpointHandlerFunction<TEndpointDefinition>, name?: string): EndpointHandlerClass;
export declare type EndpointMiddlewareHandlerFunction = (context: EndpointContext<any, any, any>, next: () => Promise<void>) => Promise<void> | void;
export declare class EndpointMiddleware implements IEndpointHandler {
    private handler;
    readonly name: string;
    handle(context: EndpointContext<any, any, any>, next: () => Promise<void>): Promise<void>;
    protected define(handler: EndpointMiddlewareHandlerFunction): void;
}
export declare type EndpointMiddlewareClass = Constructor<EndpointMiddleware>;
export declare function defineMiddleware(handler: EndpointMiddlewareHandlerFunction, name?: string): EndpointMiddlewareClass;
export interface RouterIoc {
    get<T>(Class: Constructor<T>): T;
}
export declare type ObjectWithStringProps<T> = {
    [K in keyof T]: string;
};
export interface ValidateAndTransformFunctionResult<TValue> {
    value?: TValue;
    validationError?: Error | string | any;
}
export declare type ValidateAndTransformFunction = <T extends Object>(input: ObjectWithStringProps<T>, Class?: Constructor<T>) => ValidateAndTransformFunctionResult<T>;
export interface RouterOptions {
    handlers?: EndpointHandlerClass[];
    ioc?: RouterIoc;
    middleware?: EndpointMiddlewareClass[];
    validateAndTransform?: ValidateAndTransformFunction;
}
export declare type RouterHandleMethod = (request: Request<any, any>, response: Response<any>) => Promise<void>;
export interface UnprotectedRouter {
    readonly handle: RouterHandleMethod;
}
export declare class HandlerConstructorError extends Error {
    constructor(Handler: EndpointHandlerClass, innerError: Error | string | any);
}
export declare class MiddlewareConstructorError extends Error {
    constructor(Middleware: EndpointMiddlewareClass, innerError: Error | string | any);
}
export declare class Router {
    readonly validateAndTransform: ValidateAndTransformFunction | undefined;
    protected readonly handlerClasses: EndpointHandlerClass[];
    protected handlers: EndpointHandler[] | undefined;
    protected readonly middlewareClasses: EndpointMiddlewareClass[];
    protected middlewares: EndpointMiddleware[] | undefined;
    private readonly ioc;
    constructor(options?: RouterOptions);
    use(...handlers: EndpointHandlerClass[]): this;
    getHandlers(): EndpointHandler[];
    getMiddlewares(): EndpointMiddleware[];
    private createHandler;
    private createHandlers;
    private createMiddleware;
    private createMiddlewares;
}
export declare class NotFoundMiddleware extends EndpointMiddleware {
    constructor();
}

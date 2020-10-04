import { Request as ExpressRequest } from 'express';
import { Request as TypePointRequest, RequestCookies, RequestHeaders } from '../../server';
import { HttpMethod } from '../../shared/http';
export declare class TypePointExpressRequest<TParams, TBody> implements TypePointRequest<TParams, TBody> {
    private request;
    readonly url: string;
    readonly method: HttpMethod;
    params: TParams;
    body: TBody;
    readonly cookies: RequestCookies;
    readonly headers: RequestHeaders;
    readonly signedCookies: RequestCookies;
    constructor(request: ExpressRequest);
    cookie(name: string): string | undefined;
    header(name: string): string | string[] | undefined;
    signedCookie(name: string): string | undefined;
}

import { Response as ExpressResponse } from 'express';
import { Response as TypePointResponse, ResponseContentType, ResponseHeaders, SetCookieOptions } from '../../server';
export declare class TypePointExpressResponse<TResponseBody> implements TypePointResponse<TResponseBody> {
    private response;
    readonly hasFlushedHeaders: boolean;
    readonly hasFlushed: boolean;
    statusCode: number | undefined;
    contentType: ResponseContentType;
    body: TResponseBody | undefined;
    private innerStatusCode;
    private innerStatusText;
    private innerBody;
    private innerHasFlushedBody;
    private innerContentType;
    constructor(response: ExpressResponse);
    flushHeaders(): void;
    flush(): void;
    cookie(name: string, value: string, options: SetCookieOptions): void;
    clearCookie(name: string, options: SetCookieOptions): void;
    header(name: string): string | string[] | number | undefined;
    header(name: string, value: string | string[] | number | undefined): void;
    headers(): ResponseHeaders;
    private ensureHeadersNotSent;
    private ensureBodyNotSent;
}

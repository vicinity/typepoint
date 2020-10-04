export declare const HttpMethods: ["GET", "PUT", "POST", "PATCH", "DELETE"];
export declare type HttpMethod = typeof HttpMethods[number];
export declare class UnsupportedHttpMethod extends Error {
    constructor(method: string);
}
export declare function cleanseHttpMethod(method: string): HttpMethod;

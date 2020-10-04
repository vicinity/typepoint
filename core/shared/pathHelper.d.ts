import { ParsedUrl } from './url';
export declare class UnsupportedPathPatternError extends Error {
    constructor(path: string);
}
export declare class RequiredPathParametersNotFound extends Error {
    constructor(parameterNames: string[]);
}
export interface PathHelperParseMatch extends ParsedUrl {
    params: {
        [key: string]: any;
    };
}
export interface ParsedPathPattern extends ParsedUrl {
    parameters: string[];
}
export interface GetUrlOptions {
    params?: {
        [key: string]: any;
    } | undefined;
    server?: string | undefined;
}
export declare class PathHelper {
    readonly pathPattern: string;
    static parsePathPattern(pathPattern: string): ParsedPathPattern;
    private static generateParseFunction;
    private static getPathPatternParameterRegExp;
    private static getPathAndQueryStringSplitterRegExp;
    private static getParameterNamesFromPathPattern;
    private static checkForQueryString;
    private readonly parsedPathPattern;
    readonly parse: (path: string) => PathHelperParseMatch | undefined;
    constructor(pathPattern: string);
    url(options?: GetUrlOptions): string;
}

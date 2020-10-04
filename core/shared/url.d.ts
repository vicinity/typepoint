export interface ParsedUrl {
    prePath: string;
    path: string;
    postPath: string;
}
export declare function parseUrl(url: string): ParsedUrl;
export interface QueryParameterValues {
    [key: string]: string | string[];
}
export declare function parseQueryString(queryString: string): QueryParameterValues;

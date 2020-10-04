import { IEndpointHandler } from '../server';
import { HttpMethod } from '../shared/http';
import { PathHelperParseMatch } from '../shared/pathHelper';
export interface HandlerMatch {
    type: 'handler' | 'middleware';
    handler: IEndpointHandler;
    parsedUrl: PathHelperParseMatch;
}
export declare class HandlerMatchIterator {
    private handlers;
    private request;
    private handlerIndex;
    constructor(handlers: IEndpointHandler[], request: {
        method: HttpMethod;
        url: string;
    });
    getNextMatch(): HandlerMatch | undefined;
}

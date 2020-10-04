import * as express from 'express';
import { Router } from '../server';
import { Logger } from '../shared/logger';
export interface ToMiddlewareOptions {
    expressMiddlewares?: express.RequestHandler[];
    logger?: Logger;
}
export declare function toMiddleware(router: Router, options?: ToMiddlewareOptions): express.RequestHandler;

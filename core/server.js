"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatusCodes = require("http-status-codes");
var clientDetection_1 = require("./server/clientDetection");
var HeadersAlreadySent = /** @class */ (function (_super) {
    __extends(HeadersAlreadySent, _super);
    function HeadersAlreadySent(message) {
        var _this = this;
        var fullMessage = message ? message + ' - ' : '';
        fullMessage += 'Headers have already been sent';
        _this = _super.call(this, fullMessage) || this;
        return _this;
    }
    return HeadersAlreadySent;
}(Error));
exports.HeadersAlreadySent = HeadersAlreadySent;
var CannotRedefineHandlerDefinition = /** @class */ (function (_super) {
    __extends(CannotRedefineHandlerDefinition, _super);
    function CannotRedefineHandlerDefinition() {
        return _super.call(this, 'EndpointHandler.definition should only be set in define method during handler construction') || this;
    }
    return CannotRedefineHandlerDefinition;
}(Error));
exports.CannotRedefineHandlerDefinition = CannotRedefineHandlerDefinition;
var EndpointHandler = /** @class */ (function () {
    function EndpointHandler() {
        // `= undefined as any` is a crappy workaround strictPropertyInitialization in ts 2.7
        // without having to disable strictPropertyInitialization everywhere.
        // Deliberately don't pass handler function down in constructor as then compiler cannot infer
        // types for context and next function :(
        // tslint:disable:variable-name
        this._definition = undefined;
        this._isDefining = false;
        // tslint:enable:variable-name
        this.handler = undefined;
        this.pathHelper = undefined;
    }
    Object.defineProperty(EndpointHandler.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            if (!this._isDefining) {
                throw new CannotRedefineHandlerDefinition();
            }
            this._definition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointHandler.prototype, "name", {
        get: function () {
            return this.constructor.name;
        },
        enumerable: true,
        configurable: true
    });
    EndpointHandler.prototype.match = function (request) {
        if (request.method !== this.definition.method) {
            return undefined;
        }
        var match = this.definition.parse(request.url);
        return match;
    };
    EndpointHandler.prototype.handle = function (context, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handler(context, next)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EndpointHandler.prototype.define = function (definition, handler) {
        this._isDefining = true;
        try {
            this.definition = definition;
            this.handler = handler;
        }
        finally {
            this._isDefining = false;
        }
    };
    return EndpointHandler;
}());
exports.EndpointHandler = EndpointHandler;
function defineHandler(definition, handler, name) {
    var AnonymousEndpointHandler = /** @class */ (function (_super) {
        __extends(AnonymousEndpointHandler, _super);
        function AnonymousEndpointHandler() {
            var _this = _super.call(this) || this;
            _this.define(definition, handler);
            return _this;
        }
        Object.defineProperty(AnonymousEndpointHandler.prototype, "name", {
            get: function () {
                return name || 'AnonymousEndpointHandler';
            },
            enumerable: true,
            configurable: true
        });
        return AnonymousEndpointHandler;
    }(EndpointHandler));
    return AnonymousEndpointHandler;
}
exports.defineHandler = defineHandler;
var EndpointMiddleware = /** @class */ (function () {
    function EndpointMiddleware() {
        // `= undefined as any` is a crappy workaround strictPropertyInitialization in ts 2.7
        // without having to disable strictPropertyInitialization everywhere.
        // Deliberately don't pass handler function down in constructor as inversify ioc library doesn't like
        // descendant EndpointMiddleware classes to have less params in constructor than there exist in the
        // base class's constructor (not sure why? seems dumb but probably a good reason why)
        this.handler = undefined;
    }
    Object.defineProperty(EndpointMiddleware.prototype, "name", {
        // constructor(private readonly handler: EndpointMiddlewareHandlerFunction) {
        // }
        get: function () {
            return this.constructor.name;
        },
        enumerable: true,
        configurable: true
    });
    EndpointMiddleware.prototype.handle = function (context, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handler(context, next)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EndpointMiddleware.prototype.define = function (handler) {
        this.handler = handler;
    };
    return EndpointMiddleware;
}());
exports.EndpointMiddleware = EndpointMiddleware;
function defineMiddleware(handler, name) {
    var AnonymousEndpointMiddleware = /** @class */ (function (_super) {
        __extends(AnonymousEndpointMiddleware, _super);
        function AnonymousEndpointMiddleware() {
            var _this = _super.call(this) || this;
            _this.define(handler);
            return _this;
        }
        Object.defineProperty(AnonymousEndpointMiddleware.prototype, "name", {
            get: function () {
                return name || 'AnonymousEndpointMiddleware';
            },
            enumerable: true,
            configurable: true
        });
        return AnonymousEndpointMiddleware;
    }(EndpointMiddleware));
    return AnonymousEndpointMiddleware;
}
exports.defineMiddleware = defineMiddleware;
var HandlerConstructorError = /** @class */ (function (_super) {
    __extends(HandlerConstructorError, _super);
    function HandlerConstructorError(Handler, innerError) {
        var _this = this;
        var message = "Error creating handler";
        if (Handler.name) {
            message += " " + Handler.name;
        }
        if (innerError) {
            if (typeof innerError === 'string') {
                message += ": " + innerError;
            }
            else if (innerError.message) {
                message += ": " + innerError.message;
            }
            if (innerError.stack) {
                message += "\n\n" + innerError.stack;
            }
        }
        _this = _super.call(this, message) || this;
        return _this;
    }
    return HandlerConstructorError;
}(Error));
exports.HandlerConstructorError = HandlerConstructorError;
var MiddlewareConstructorError = /** @class */ (function (_super) {
    __extends(MiddlewareConstructorError, _super);
    function MiddlewareConstructorError(Middleware, innerError) {
        var _this = this;
        var message = "Error creating handler";
        if (Middleware.name) {
            message += " " + Middleware.name;
        }
        if (innerError) {
            if (typeof innerError === 'string') {
                message += ": " + innerError;
            }
            else if (innerError.message) {
                message += ": " + innerError.message;
            }
            if (innerError.stack) {
                message += "\n\n" + innerError.stack;
            }
        }
        _this = _super.call(this, message) || this;
        return _this;
    }
    return MiddlewareConstructorError;
}(Error));
exports.MiddlewareConstructorError = MiddlewareConstructorError;
var Router = /** @class */ (function () {
    function Router(options) {
        var _a, _b;
        this.handlerClasses = [];
        this.middlewareClasses = [];
        this.ioc = (options && options.ioc) || {
            get: function (Class) {
                return new Class();
            }
        };
        this.validateAndTransform = options && options.validateAndTransform;
        var handlers = (options && options.handlers) || [];
        if (handlers.length) {
            (_a = this.handlerClasses).push.apply(_a, handlers);
        }
        var middlewares = (options && options.middleware) || [];
        if (middlewares.length) {
            (_b = this.middlewareClasses).push.apply(_b, middlewares);
        }
    }
    Router.prototype.use = function () {
        var _a;
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        if (handlers.length) {
            (_a = this.handlerClasses).push.apply(_a, handlers);
            this.handlers = undefined;
        }
        return this;
    };
    // tslint:disable-next-line:max-line-length
    // TODO: Consider replacing getHandlers and getMiddlewares with method that returns a consolidated promise-based middleware creator?
    Router.prototype.getHandlers = function () {
        if (!this.handlers) {
            this.handlers = this.createHandlers();
        }
        return this.handlers;
    };
    Router.prototype.getMiddlewares = function () {
        if (!this.middlewares) {
            this.middlewares = this.createMiddlewares();
        }
        return this.middlewares;
    };
    // TODO: Add test for creating handlers and middleware not using ioc
    Router.prototype.createHandler = function (Handler) {
        try {
            return this.ioc.get(Handler);
        }
        catch (err) {
            throw new HandlerConstructorError(Handler, err);
        }
    };
    Router.prototype.createHandlers = function () {
        var _this = this;
        var result = this.handlerClasses.map(function (Handler) { return _this.createHandler(Handler); });
        return result;
    };
    Router.prototype.createMiddleware = function (Middleware) {
        try {
            return this.ioc.get(Middleware);
        }
        catch (err) {
            throw new MiddlewareConstructorError(Middleware, err);
        }
    };
    Router.prototype.createMiddlewares = function () {
        var _this = this;
        var result = this.middlewareClasses.map(function (Middleware) { return _this.createMiddleware(Middleware); });
        return result;
    };
    return Router;
}());
exports.Router = Router;
var NotFoundMiddleware = /** @class */ (function (_super) {
    __extends(NotFoundMiddleware, _super);
    function NotFoundMiddleware() {
        var _this = _super.call(this) || this;
        _this.define(function (context, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        if (!context.response.hasFlushedHeaders && !context.response.statusCode) {
                            context.response.statusCode = httpStatusCodes.NOT_FOUND;
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        return _this;
    }
    return NotFoundMiddleware;
}(EndpointMiddleware));
exports.NotFoundMiddleware = NotFoundMiddleware;
clientDetection_1.warnIfWindowDetected(typeof window === 'undefined' ? undefined : window, console);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRDtBQUNyRCw0REFBZ0U7QUFtRWhFO0lBQXdDLHNDQUFLO0lBQzNDLDRCQUFZLE9BQWdCO1FBQTVCLGlCQUlDO1FBSEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakQsV0FBVyxJQUFJLGdDQUFnQyxDQUFDO1FBQ2hELFFBQUEsa0JBQU0sV0FBVyxDQUFDLFNBQUM7O0lBQ3JCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFORCxDQUF3QyxLQUFLLEdBTTVDO0FBTlksZ0RBQWtCO0FBa0YvQjtJQUFxRCxtREFBSztJQUN4RDtlQUNFLGtCQUFNLDRGQUE0RixDQUFDO0lBQ3JHLENBQUM7SUFDSCxzQ0FBQztBQUFELENBQUMsQUFKRCxDQUFxRCxLQUFLLEdBSXpEO0FBSlksMEVBQStCO0FBTTVDO0lBQUE7UUFZRSxxRkFBcUY7UUFDckYscUVBQXFFO1FBQ3JFLDZGQUE2RjtRQUM3Rix5Q0FBeUM7UUFDekMsK0JBQStCO1FBQ3ZCLGdCQUFXLEdBQXNDLFNBQWdCLENBQUM7UUFDbEUsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDckMsOEJBQThCO1FBQ3RCLFlBQU8sR0FBaUMsU0FBZ0IsQ0FBQztRQUN6RCxlQUFVLEdBQWUsU0FBZ0IsQ0FBQztJQStCcEQsQ0FBQztJQW5EQyxzQkFBSSx1Q0FBVTthQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFlLEtBQXdDO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixNQUFNLElBQUksK0JBQStCLEVB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
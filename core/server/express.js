"use strict";
// TODO: Move this into separate package e.g. @typepoint/express
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
var clone = require("clone");
var httpStatusCodes = require("http-status-codes");
var http_1 = require("../shared/http");
var logger_1 = require("../shared/logger");
var middleware_1 = require("./express/middleware");
var typePointExpressRequest_1 = require("./express/typePointExpressRequest");
var typePointExpressResponse_1 = require("./express/typePointExpressResponse");
var middlewareHelper_1 = require("./middlewareHelper");
function validateAndTransformParams(options) {
    var classInfo = options.classInfo, context = options.context, router = options.router;
    if (!router.validateAndTransform) {
        return true;
    }
    var requestParamsClass = classInfo && classInfo.request.params;
    if (!requestParamsClass) {
        return true;
    }
    var validationResult = router.validateAndTransform(context.request.params, requestParamsClass);
    if (validationResult.validationError) {
        context.response.statusCode = httpStatusCodes.BAD_REQUEST;
        context.response.body = validationResult.validationError;
        return false;
    }
    context.request.params = validationResult.value;
    return true;
}
function validateAndTransformBody(options) {
    var classInfo = options.classInfo, context = options.context, originalRequestBody = options.originalRequestBody, router = options.router;
    if (!router.validateAndTransform) {
        return true;
    }
    var requestBodyClass = classInfo && classInfo.request.body;
    if (!requestBodyClass) {
        return true;
    }
    var validationResult = router.validateAndTransform(clone(originalRequestBody), requestBodyClass);
    if (validationResult.validationError) {
        context.response.statusCode = httpStatusCodes.BAD_REQUEST;
        context.response.body = validationResult.validationError;
        return false;
    }
    context.request.body = validationResult.value;
    return true;
}
function validateAndTransform(options) {
    var context = options.context, handlerMatch = options.handlerMatch, originalRequestBody = options.originalRequestBody, router = options.router;
    var definition = handlerMatch.handler.definition;
    var classInfo = definition && definition.classInfo;
    if (!validateAndTransformParams({ classInfo: classInfo, context: context, router: router })) {
        return false;
    }
    if (!validateAndTransformBody({ classInfo: classInfo, context: context, originalRequestBody: originalRequestBody, router: router })) {
        return false;
    }
    return true;
}
function trySendInternalServerError(res, err) {
    if (!res.headersSent) {
        res.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
        res.json((err && err.message) || err);
        res.end();
    }
}
function toMiddleware(router, options) {
    var _this = this;
    var logger = (options && options.logger) || new logger_1.NoopLogger();
    var handlersMiddleware = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var context, originalRequestBody, meta, request, response, allHandlers, handlerMatchIterator_1, executeNextHandler_1, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    originalRequestBody = clone(req.body);
                    try {
                        meta = {};
                        request = new typePointExpressRequest_1.TypePointExpressRequest(req);
                        response = new typePointExpressResponse_1.TypePointExpressResponse(res);
                        context = { meta: meta, request: request, response: response };
                    }
                    catch (err) {
                        logger.error('Error constructing context: ', err);
                        trySendInternalServerError(res, err);
                    }
                    if (!context) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    allHandlers = router.getMiddlewares().concat(router.getHandlers());
                    handlerMatchIterator_1 = new middlewareHelper_1.HandlerMatchIterator(allHandlers, {
                        method: http_1.cleanseHttpMethod(req.method),
                        url: req.url
                    });
                    executeNextHandler_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                        var handlerMatch;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    handlerMatch = handlerMatchIterator_1.getNextMatch();
                                    if (!(context && handlerMatch)) return [3 /*break*/, 2];
                                    context.request.params = handlerMatch.parsedUrl.params;
                                    if (!validateAndTransform({ context: context, handlerMatch: handlerMatch, originalRequestBody: originalRequestBody, router: router })) {
                                        return [2 /*return*/];
                                    }
                                    if (handlerMatch.handler.name) {
                                        logger.debug("Executing " + handlerMatch.type + ": " + handlerMatch.handler.name);
                                    }
                                    return [4 /*yield*/, handlerMatch.handler.handle(context, executeNextHandler_1)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, executeNextHandler_1()];
                case 2:
                    _a.sent();
                    if (!context.response.statusCode) return [3 /*break*/, 3];
                    context.response.flush();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, next()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    logger.error(err_1);
                    trySendInternalServerError(res, err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var allMiddleware = ((options && options.expressMiddlewares) || []).concat([
        handlersMiddleware
    ]);
    var combinedMiddleware = middleware_1.combineMiddlewares(allMiddleware);
    return combinedMiddleware;
}
exports.toMiddleware = toMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvZXhwcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0VBQWdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWhFLDZCQUErQjtBQUUvQixtREFBcUQ7QUFVckQsdUNBQW1EO0FBRW5ELDJDQUE4QztBQUM5QyxtREFBMEQ7QUFDMUQsNkVBQTRFO0FBQzVFLCtFQUE4RTtBQUM5RSx1REFBd0U7QUFvQnhFLFNBQVMsMEJBQTBCLENBQUMsT0FBMEM7SUFDcEUsSUFBQSw2QkFBUyxFQUFFLHlCQUFPLEVBQUUsdUJBQU0sQ0FBYTtJQUUvQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFNLGtCQUFrQixHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNqRSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDdkIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDakcsSUFBSSxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7UUFDcEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUMxRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7UUFDekQsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUNoRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFTRCxTQUFTLHdCQUF3QixDQUFDLE9BQXdD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

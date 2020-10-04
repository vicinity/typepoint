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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./shared/functions");
var http_1 = require("./shared/http");
var pathBuilder_1 = require("./shared/pathBuilder");
var pathHelper_1 = require("./shared/pathHelper");
exports.IsEmptyFieldName = ' isEmpty ';
var Empty = /** @class */ (function () {
    function Empty() {
    }
    return Empty;
}());
exports.Empty = Empty;
var ArrayOfClassInfo = /** @class */ (function () {
    function ArrayOfClassInfo(element) {
        this.element = element;
    }
    return ArrayOfClassInfo;
}());
exports.ArrayOfClassInfo = ArrayOfClassInfo;
var DoNotReferenceTypeInfo = /** @class */ (function (_super) {
    __extends(DoNotReferenceTypeInfo, _super);
    function DoNotReferenceTypeInfo(name) {
        return _super.call(this, "Do not evaluate " + name + ".typeInfo(). It is reserved for internal use only.") || this;
    }
    return DoNotReferenceTypeInfo;
}(Error));
exports.DoNotReferenceTypeInfo = DoNotReferenceTypeInfo;
var ArrayOf = /** @class */ (function () {
    function ArrayOf(Class) {
        this.classInfo = new ArrayOfClassInfo(Class);
    }
    ArrayOf.prototype.typeInfo = function () {
        throw new DoNotReferenceTypeInfo('ArrayOf');
    };
    ArrayOf.isArrayOf = true;
    return ArrayOf;
}());
exports.ArrayOf = ArrayOf;
function arrayOf(Class) {
    var AnonymousArrayOf = /** @class */ (function (_super) {
        __extends(AnonymousArrayOf, _super);
        function AnonymousArrayOf() {
            return _super.call(this, Class) || this;
        }
        return AnonymousArrayOf;
    }(ArrayOf));
    return AnonymousArrayOf;
}
exports.arrayOf = arrayOf;
function isArrayOf(Class) {
    return !!(Class && Class.isArrayOf);
}
exports.isArrayOf = isArrayOf;
function isClassBasedEndpointDefinitionOptions(options) {
    var partialOptions = options;
    return !!(partialOptions.requestParams &&
        partialOptions.requestBody &&
        partialOptions.responseBody);
}
var EndpointDefinitionRequestClassInfo = /** @class */ (function () {
    function EndpointDefinitionRequestClassInfo(params, body) {
        this.params = params;
        this.body = body;
    }
    return EndpointDefinitionRequestClassInfo;
}());
exports.EndpointDefinitionRequestClassInfo = EndpointDefinitionRequestClassInfo;
var EndpointDefinitionResponseClassInfo = /** @class */ (function () {
    function EndpointDefinitionResponseClassInfo(body) {
        this.body = body;
    }
    return EndpointDefinitionResponseClassInfo;
}());
exports.EndpointDefinitionResponseClassInfo = EndpointDefinitionResponseClassInfo;
var EndpointDefinitionClassInfo = /** @class */ (function () {
    function EndpointDefinitionClassInfo(requestParams, requestBody, responseBody) {
        this.request = new EndpointDefinitionRequestClassInfo(requestParams, requestBody);
        this.response = new EndpointDefinitionResponseClassInfo(responseBody);
    }
    return EndpointDefinitionClassInfo;
}());
exports.EndpointDefinitionClassInfo = EndpointDefinitionClassInfo;
var EndpointDefinitionInvalidConstructorArgs = /** @class */ (function (_super) {
    __extends(EndpointDefinitionInvalidConstructorArgs, _super);
    function EndpointDefinitionInvalidConstructorArgs(actualArguments) {
        var _this = this;
        var received = (!actualArguments.length ?
            'zero arguments' :
            functions_1.argumentsToArray(actualArguments).map(function (arg) { return typeof arg; }).join(', '));
        _this = _super.call(this, "Invalid EndpointDefinition constructor arguments - received " + arguments.length + " arguments: " + received) || this;
        return _this;
    }
    return EndpointDefinitionInvalidConstructorArgs;
}(Error));
exports.EndpointDefinitionInvalidConstructorArgs = EndpointDefinitionInvalidConstructorArgs;
var EndpointDefinition = /** @class */ (function () {
    function EndpointDefinition() {
        var DEFAULT_METHOD = 'GET';
        switch (arguments.length) {
            case 1: {
                if (typeof arguments[0] === 'object') {
                    var options = arguments[0];
                    this.method = http_1.cleanseHttpMethod(options.method || DEFAULT_METHOD);
                    this.path = pathBuilder_1.createPath(options.path);
                    this.pathHelper = new pathHelper_1.PathHelper(this.path);
                    if (isClassBasedEndpointDefinitionOptions(options)) {
                        this.classInfo = new EndpointDefinitionClassInfo(options.requestParams, options.requestBody, options.responseBody);
                    }
                }
                else if (typeof arguments[0] === 'function') {
                    this.method = DEFAULT_METHOD;
                    this.path = pathBuilder_1.createPath(arguments[0]);
                    this.pathHelper = new pathHelper_1.PathHelper(this.path);
                }
                else {
                    throw new EndpointDefinitionInvalidConstructorArgs(arguments);
                }
                break;
            }
            case 2: {
                this.method = http_1.cleanseHttpMethod(arguments[0]);
                this.path = pathBuilder_1.createPath(arguments[1]);
                this.pathHelper = new pathHelper_1.PathHelper(this.path);
                break;
            }
            default: {
                throw new EndpointDefinitionInvalidConstructorArgs(arguments);
            }
        }
    }
    EndpointDefinition.prototype.typeInfo = function () {
        throw new DoNotReferenceTypeInfo('EndpointDefinition');
    };
    EndpointDefinition.prototype.parse = function (url) {
        return this.pathHelper.parse(url);
    };
    EndpointDefinition.prototype.url = function (options) {
        var result = this.pathHelper.url(options);
        return result;
    };
    return EndpointDefinition;
}());
exports.EndpointDefinition = EndpointDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NoYXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBc0Q7QUFDdEQsc0NBQTJFO0FBQzNFLG9EQUF3RTtBQUN4RSxrREFBdUU7QUFJMUQsUUFBQSxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7QUFFNUM7SUFBQTtJQUVBLENBQUM7SUFBRCxZQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxzQkFBSztBQVFsQjtJQUNFLDBCQUFxQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUM1QyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLDRDQUFnQjtBQUs3QjtJQUE0QywwQ0FBSztJQUMvQyxnQ0FBWSxJQUFZO2VBQ3RCLGtCQUFNLHFCQUFvQixJQUFJLHVEQUFxRCxDQUFDO0lBQ3RGLENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUFKRCxDQUE0QyxLQUFLLEdBSWhEO0FBSlksd0RBQXNCO0FBTW5DO0lBS0UsaUJBQVksS0FBcUI7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCwwQkFBUSxHQUFSO1FBQ0UsTUFBTSxJQUFJLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFWTSxpQkFBUyxHQUFTLElBQUksQ0FBQztJQVdoQyxjQUFDO0NBQUEsQUFaRCxJQVlDO0FBWnFCLDBCQUFPO0FBYzdCLFNBQWdCLE9BQU8sQ0FBSSxLQUFxQjtJQUM5QztRQUErQixvQ0FBVTtRQUN2QzttQkFDRSxrQkFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO1FBQ0gsdUJBQUM7SUFBRCxDQUFDLEFBSkQsQ0FBK0IsT0FBTyxHQUlyQztJQUVELE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQVJELDBCQVFD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
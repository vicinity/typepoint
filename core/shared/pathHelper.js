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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var regexp_1 = require("./regexp");
var url_1 = require("./url");
var UnsupportedPathPatternError = /** @class */ (function (_super) {
    __extends(UnsupportedPathPatternError, _super);
    function UnsupportedPathPatternError(path) {
        return _super.call(this, "Unsupported path pattern: \"" + path + "\"") || this;
    }
    return UnsupportedPathPatternError;
}(Error));
exports.UnsupportedPathPatternError = UnsupportedPathPatternError;
var RequiredPathParametersNotFound = /** @class */ (function (_super) {
    __extends(RequiredPathParametersNotFound, _super);
    function RequiredPathParametersNotFound(parameterNames) {
        return _super.call(this, "Required path parameters not found: " + parameterNames.join(', ')) || this;
    }
    return RequiredPathParametersNotFound;
}(Error));
exports.RequiredPathParametersNotFound = RequiredPathParametersNotFound;
var PathHelper = /** @class */ (function () {
    function PathHelper(pathPattern) {
        this.pathPattern = pathPattern;
        this.parsedPathPattern = PathHelper.parsePathPattern(this.pathPattern);
        // tslint:disable-next-line:member-ordering
        this.parse = PathHelper.generateParseFunction(this.parsedPathPattern);
        PathHelper.checkForQueryString(pathPattern);
    }
    PathHelper.parsePathPattern = function (pathPattern) {
        var parsedUrl = url_1.parseUrl(pathPattern);
        var parameters = this.getParameterNamesFromPathPattern(parsedUrl.path);
        return __assign({}, parsedUrl, { parameters: parameters });
    };
    PathHelper.generateParseFunction = function (parsedPathPattern) {
        var parameterNames = [];
        var getParameterPlaceholder = function (index) { return "-----" + index + "-----"; };
        var pathParametersRegExpPattern = parsedPathPattern.path.replace(this.getPathPatternParameterRegExp(), function (_, key) {
            parameterNames.push(key);
            return getParameterPlaceholder(parameterNames.length - 1);
        });
        pathParametersRegExpPattern = regexp_1.escapeRegExp(pathParametersRegExpPattern);
        for (var parameterIndex = 0; parameterIndex < parameterNames.length; parameterIndex++) {
            pathParametersRegExpPattern = pathParametersRegExpPattern
                .replace(regexp_1.escapeRegExp(getParameterPlaceholder(parameterIndex)), '([^&?\/\\\\]+)');
        }
        pathParametersRegExpPattern = '^' + pathParametersRegExpPattern + '$';
        var pathParametersRegEx = new RegExp(pathParametersRegExpPattern, 'i');
        return function (path) {
            var parsedUrl = url_1.parseUrl(path);
            // Test url and extract path parameters
            pathParametersRegEx.lastIndex = -1;
            var parameterValues = [];
            var match = pathParametersRegEx.exec(parsedUrl.path);
            if (!match) {
                return undefined;
            }
            var result = __assign({}, parsedUrl, { params: {} });
            // Add path parameters to result
            if (match.length > 1) {
                for (var parameterIndex = 1; parameterIndex < match.length; parameterIndex++) {
                    var parameterName = parameterNames[parameterIndex - 1];
                    var parameterValue = match[parameterIndex];
                    result.params[parameterName] = parameterValue;
                }
            }
            // Extract and add query string parameters to result
            var queryStringParameters = url_1.parseQueryString(parsedUrl.postPath);
            for (var _i = 0, _a = Object.getOwnPropertyNames(queryStringParameters); _i < _a.length; _i++) {
                var parameterName = _a[_i];
                var parameterValue = queryStringParameters[parameterName];
                result.params[parameterName] = parameterValue;
            }
            return result;
        };
    };
    PathHelper.getParameterNamesFromPathPattern = function (pathPattern) {
        var parameterNames = [];
        var pathParameterRegExp = PathHelper.getPathPatternParameterRegExp();
        while (true) {
            var parametersMatch = pathParameterRegExp.exec(pathPattern);
            if (parametersMatch) {
                parameterNames.push(parametersMatch[1]);
            }
            else {
                break;
            }
        }
        return parameterNames;
    };
    PathHelper.checkForQueryString = function (path) {
        if (path.indexOf('?') > -1) {
            throw new UnsupportedPathPatternError(path);
        }
    };
    PathHelper.prototype.url = function (options) {
        var params = (options && options.params) || {};
        var server = (options && options.server) || '';
        var providedParameterNames = params ? Object.getOwnPropertyNames(params) : [];
        var missingParameterNames = [];
        var queryStringParameterNames = [];
        var _loop_1 = function (requiredParameterName) {
            var isRequiredParameterProvided = providedParameterNames.some(function (parameterName) { return parameterName === requiredParameterName; });
            if (!isRequiredParameterProvided) {
                missingParameterNames.push(requiredParameterName);
            }
        };
        for (var _i = 0, _a = this.parsedPathPattern.parameters; _i < _a.length; _i++) {
            var requiredParameterName = _a[_i];
            _loop_1(requiredParameterName);
        }
        var _loop_2 = function (providedParameterName) {
            var isProvidedParameterRequired = this_1.parsedPathPattern.parameters.some(function (parameterName) { return parameterName === providedParameterName; });
            if (!isProvidedParameterRequired) {
                queryStringParameterNames.push(providedParameterName);
            }
        };
        var this_1 = this;
        for (var _b = 0, providedParameterNames_1 = providedParameterNames; _b < providedParameterNames_1.length; _b++) {
            var providedParameterName = providedParameterNames_1[_b];
            _loop_2(providedParameterName);
        }
        if (missingParameterNames.length) {
            throw new RequiredPathParametersNotFound(missingParameterNames);
        }
        var url = this.pathPattern.replace(/:([^\s\/\?\n\d][^\s\/\?\n]*)/gim, function (_, key) {
            var parameterValue = params[key];
            parameterValue = typeof parameterValue === 'undefined' ? '' : parameterValue;
            return parameterValue;
        });
        var queryString = queryStringParameterNames
            .map(function (parameterName) { return encodeURIComponent(parameterName) + '=' + encodeURIComponent(params[parameterName]); })
            .join('&');
        if (queryString) {
            url = url + (url.indexOf('?') === -1 ? '?' : '&') + queryString;
        }
        if (server) {
            url = server + url;
        }
        return url;
    };
    PathHelper.getPathPatternParameterRegExp = function () { return /\:([^\s\/\?\n\d][^\s\/\?\n]*)/gim; };
    PathHelper.getPathAndQueryStringSplitterRegExp = function () { return /^([^\?\n] +)(\?.*)?$/i; };
    return PathHelper;
}());
exports.PathHelper = PathHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFyZWQvcGF0aEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF3QztBQUN4Qyw2QkFBb0Y7QUFFcEY7SUFBaUQsK0NBQUs7SUFDcEQscUNBQVksSUFBWTtlQUN0QixrQkFBTSxpQ0FBK0IsSUFBSSxPQUFJLENBQUM7SUFDaEQsQ0FBQztJQUNILGtDQUFDO0FBQUQsQ0FBQyxBQUpELENBQWlELEtBQUssR0FJckQ7QUFKWSxrRUFBMkI7QUFNeEM7SUFBb0Qsa0RBQUs7SUFDdkQsd0NBQVksY0FBd0I7ZUFDbEMsa0JBQU0seUNBQXdDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLENBQUM7SUFDN0UsQ0FBQztJQUNILHFDQUFDO0FBQUQsQ0FBQyxBQUpELENBQW9ELEtBQUssR0FJeEQ7QUFKWSx3RUFBOEI7QUFtQjNDO0lBaUdFLG9CQUFxQixXQUFtQjtRQUFuQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUx2QixzQkFBaUIsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5GLDJDQUEyQztRQUNsQyxVQUFLLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBR3hFLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBbEdNLDJCQUFnQixHQUF2QixVQUF3QixXQUFtQjtRQUN6QyxJQUFNLFNBQVMsR0FBRyxjQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6RSxvQkFDSyxTQUFTLElBQ1osVUFBVSxZQUFBLElBQ1Y7SUFDSixDQUFDO0lBRWMsZ0NBQXFCLEdBQXBDLFVBQ0UsaUJBQW9DO1FBRXBDLElBQU0sY0FBYyxHQUFhLEVBQUUsQ0FBQztRQUNwQyxJQUFNLHVCQUF1QixHQUFHLFVBQUMsS0FBYSxJQUFLLE9BQUEsVUFBUyxLQUFLLFVBQVEsRUFBdEIsQ0FBc0IsQ0FBQztRQUUxRSxJQUFJLDJCQUEyQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUM1RyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sdUJBQXVCLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUVILDJCQUEyQixHQUFHLHFCQUFZLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN4RSxLQUFLLElBQUksY0FBYyxHQUFHLENBQUMsRUFBRSxjQUFjLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRTtZQUNyRiwyQkFBMkIsR0FBRywyQkFBMkI7aUJBQ3RELE9BQU8sQ0FBQyxxQkFBWSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUNyRjtRQUNELDJCQUEyQixHQUFHLEdBQUcsR0FBRywyQkFBMkIsR0FBRyxHQUFHLENBQUM7UUFFdEUsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6RSxPQUFPLFVBQUMsSUFBWTtZQUNsQixJQUFNLFNBQVMsR0FBRyxjQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFakMsdUNBQXVDO1lBQ3ZDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFNLGVBQWUsR0FBYSxFQUFFLENBQUM7WUFDckMsSUFBTSxLQUFLLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1lBRUQsSUFBTSxNQUFNLGdCQUNQLFNBQVMsSUFDWixNQUFNLEVBQUUsRUFBRSxHQUNYLENBQUM7WUFFRixnQ0FBZ0M7WUFDaEMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsS0FBSyxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUUsY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUU7b0JBQzVFLElBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pELElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxjQUFjLENBQUM7aUJBQy9DO2FBQ0Y7WUFFRCxvREFBb0Q7WUFDcEQsSUFBTSxxQkFBcUIsR0FBRyxzQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkUsS0FBNEIsVUFBaUQsRUFBakQsS0FBQSxNQUFNLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsRUFBakQsY0FBaUQsRUFBakQsSUFBaUQsRUFBRTtnQkFBMUUsSUFBTSxhQUFhLFNBQUE7Z0JBQ3RCLElBQU0sY0FBYyxHQUFHLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGNBQWMsQ0FBQzthQUMvQztZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFNYywyQ0FBZ0MsR0FBL0MsVUFBZ0QsV0FBbUI7UUFDakUsSUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDO1FBQ3BDLElBQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDdkUsT0FBTyxJQUFJLEVBQUU7WUFDWCxJQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUQsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0wsTUFBTTthQUNQO1NBQ0Y7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRWMsOEJBQW1CLEdBQWxDLFVBQW1DLElBQVk7UUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFXRCx3QkFBRyxHQUFILFVBQUksT0FBdUI7UUFDekIsSUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRCxJQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWpELElBQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoRixJQUFNLHFCQUFxQixHQUFhLEVBQUUsQ0FBQztRQUMzQyxJQUFNLHlCQUF5QixHQUFhLEVBQUUsQ0FBQztnQ0FFcEMscUJBQXFCO1lBQzlCLElBQU0sMkJBQTJCLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUM3RCxVQUFBLGFBQWEsSUFBSSxPQUFBLGFBQWEsS0FBSyxxQkFBcUIsRUFBdkMsQ0FBdUMsQ0FDekQsQ0FBQztZQUNGLElBQUksQ0FBQywyQkFBMkIsRUFBRTtnQkFDaEMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDbkQ7O1FBTkgsS0FBb0MsVUFBaUMsRUFBakMsS0FBQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFqQyxjQUFpQyxFQUFqQyxJQUFpQztZQUFoRSxJQUFNLHFCQUFxQixTQUFBO29CQUFyQixxQkFBcUI7U0FPL0I7Z0NBRVUscUJBQXFCO1lBQzlCLElBQU0sMkJBQTJCLEdBQUcsT0FBSyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUN4RSxVQUFBLGFBQWEsSUFBSSxPQUFBLGFBQWEsS0FBSyxxQkFBcUIsRUFBdkMsQ0FBdUMsQ0FDekQsQ0FBQztZQUNGLElBQUksQ0FBQywyQkFBMkIsRUFBRTtnQkFDaEMseUJBQXlCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDdkQ7OztRQU5ILEtBQW9DLFVBQXNCLEVBQXRCLGlEQUFzQixFQUF0QixvQ0FBc0IsRUFBdEIsSUFBc0I7WUFBckQsSUFBTSxxQkFBcUIsK0JBQUE7b0JBQXJCLHFCQUFxQjtTQU8vQjtRQUVELElBQUkscUJBQXFCLENBQUMsTUFBTSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSw4QkFBOEIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUMzRSxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsY0FBYyxHQUFHLE9BQU8sY0FBYyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDN0UsT0FBTyxjQUFjLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFNLFdBQVcsR0FBRyx5QkFBeUI7YUFDMUMsR0FBRyxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFuRixDQUFtRixDQUFDO2FBQ3pHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUViLElBQUksV0FBVyxFQUFFO1lBQ2YsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxNQUFNLEVBQUU7WUFDVixHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNwQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQWxGYyx3Q0FBNkIsR0FBRyxjQUFNLE9BQUEsa0NBQWtDLEVBQWxDLENBQWtDLENBQUM7SUFFekUsOENBQW1DLEdBQUcsY0FBTSxPQUFBLHVCQUF1QixFQUF2QixDQUF1QixDQUFDO0lBaUZyRixpQkFBQztDQUFBLEFBdkpELElBdUpDO0FBdkpZLGdDQUFVIn0=
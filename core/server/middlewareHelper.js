"use strict";
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
var url_1 = require("../shared/url");
var HandlerMatchIterator = /** @class */ (function () {
    function HandlerMatchIterator(handlers, request) {
        this.handlers = handlers;
        this.request = request;
        this.handlerIndex = 0;
    }
    HandlerMatchIterator.prototype.getNextMatch = function () {
        while (this.handlerIndex < this.handlers.length) {
            var handler = this.handlers[this.handlerIndex++];
            if (handler.match) {
                var parsedUrl = handler.match(this.request);
                if (parsedUrl) {
                    return {
                        type: 'handler',
                        handler: handler,
                        parsedUrl: parsedUrl
                    };
                }
            }
            else {
                var parsedUrl = url_1.parseUrl(this.request.url);
                var params = url_1.parseQueryString(parsedUrl.postPath);
                return {
                    type: 'middleware',
                    handler: handler,
                    parsedUrl: __assign({}, parsedUrl, { params: params })
                };
            }
        }
        return undefined;
    };
    return HandlerMatchIterator;
}());
exports.HandlerMatchIterator = HandlerMatchIterator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EscUNBQTJEO0FBUTNEO0lBR0UsOEJBQ1UsUUFBNEIsRUFDNUIsT0FBNEM7UUFENUMsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFDNUIsWUFBTyxHQUFQLE9BQU8sQ0FBcUM7UUFKOUMsaUJBQVksR0FBVyxDQUFDLENBQUM7SUFLakMsQ0FBQztJQUVELDJDQUFZLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDL0MsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLFNBQVMsRUFBRTtvQkFDYixPQUFPO3dCQUNMLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sU0FBQTt3QkFDUCxTQUFTLFdBQUE7cUJBQ1YsQ0FBQztpQkFDSDthQUNGO2lCQUFNO2dCQUNMLElBQU0sU0FBUyxHQUFHLGNBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxJQUFNLE1BQU0sR0FBRyxzQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELE9BQU87b0JBQ0wsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLE9BQU8sU0FBQTtvQkFDUCxTQUFTLGVBQ0osU0FBUyxJQUNaLE1BQU0sUUFBQSxHQUNQO2lCQUNGLENBQUM7YUFDSDtTQUNGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxvREFBb0IifQ==
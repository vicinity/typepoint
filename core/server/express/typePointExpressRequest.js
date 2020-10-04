"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../../shared/http");
var TypePointExpressRequest = /** @class */ (function () {
    function TypePointExpressRequest(request) {
        this.request = request;
        this.method = http_1.cleanseHttpMethod(request.method);
        this.url = request.url;
        this.params = request.query;
        this.body = request.body;
        this.cookies = request.cookies;
        this.headers = request.headers;
        this.signedCookies = request.signedCookies;
    }
    TypePointExpressRequest.prototype.cookie = function (name) {
        return this.request.cookies[name];
    };
    TypePointExpressRequest.prototype.header = function (name) {
        var _this = this;
        function normaliseHeaderName(headerName) {
            return headerName.toLowerCase().replace(/\s+/gi, '-');
        }
        var normalisedHeaders = Object
            .getOwnPropertyNames(this.headers)
            .map(function (key) { return ({ key: normaliseHeaderName(key), value: _this.headers[key] }); })
            .reduce(function (accumulator, keyValue) {
            accumulator[keyValue.key] = keyValue.value;
            return accumulator;
        }, {});
        var normalisedHeaderName = normaliseHeaderName(name);
        var result = normalisedHeaders[normalisedHeaderName];
        return result;
    };
    TypePointExpressRequest.prototype.signedCookie = function (name) {
        return this.request.signedCookies[name];
    };
    return TypePointExpressRequest;
}());
exports.TypePointExpressRequest = TypePointExpressRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVBvaW50RXhwcmVzc1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2V4cHJlc3MvdHlwZVBvaW50RXhwcmVzc1JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwwQ0FBa0U7QUFFbEU7SUFTRSxpQ0FBb0IsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUVELHdDQUFNLEdBQU4sVUFBTyxJQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHdDQUFNLEdBQU4sVUFBTyxJQUFZO1FBQW5CLGlCQWdCQztRQWZDLFNBQVMsbUJBQW1CLENBQUMsVUFBa0I7WUFDN0MsT0FBTyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsSUFBTSxpQkFBaUIsR0FBRyxNQUFNO2FBQzdCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDakMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQTdELENBQTZELENBQUM7YUFDekUsTUFBTSxDQUFDLFVBQUMsV0FBVyxFQUFFLFFBQVE7WUFDNUIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzNDLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUMsRUFBRSxFQUFvQixDQUFDLENBQUM7UUFFM0IsSUFBTSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw4Q0FBWSxHQUFaLFVBQWEsSUFBWTtRQUN2QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksMERBQXVCIn0=
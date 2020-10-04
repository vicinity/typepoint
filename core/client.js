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
var axios_1 = require("axios");
var shared_1 = require("./shared");
var TypePointClientResponseError = /** @class */ (function (_super) {
    __extends(TypePointClientResponseError, _super);
    function TypePointClientResponseError(message, response) {
        var _this = _super.call(this, message) || this;
        _this.response = response;
        _this.statusCode = response ? response.statusCode : undefined;
        _this.statusText = response ? response.statusText : undefined;
        return _this;
    }
    return TypePointClientResponseError;
}(Error));
exports.TypePointClientResponseError = TypePointClientResponseError;
var TypePointClient = /** @class */ (function () {
    function TypePointClient(options) {
        this.axios = (options && options.axios) || axios_1.default.create();
        this.server = (options && options.server) || '';
    }
    TypePointClient.prototype.fetch = function () {
        var endpoint = arguments[0];
        var options = (arguments.length > 1 ? arguments[1] : undefined);
        var url = endpoint.url({
            server: this.server,
            params: options && options.params
        });
        var requestOptions = {
            method: endpoint.method,
            url: url
        };
        if (options && options.body) {
            requestOptions.data = options.body;
        }
        return this.axios.request(requestOptions)
            .then(function (res) {
            var response = {
                statusCode: res.status,
                statusText: res.statusText,
                header: function (name) { return res.headers[name]; },
                headers: res.headers,
                body: res.data
            };
            return response;
        }, function (err) {
            var res = err.response;
            var response = (res ? {
                statusCode: res.status,
                statusText: res.statusText,
                header: function (name) { return res.headers[name]; },
                headers: res.headers,
                body: res.data
            } : undefined);
            var error = new TypePointClientResponseError(err.message || "" + err, response);
            throw error;
        });
    };
    return TypePointClient;
}());
exports.TypePointClient = TypePointClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBaUU7QUFFakUsbUNBQTBGO0FBeUQxRjtJQUFrRCxnREFBSztJQUtyRCxzQ0FDRSxPQUFlLEVBQ1IsUUFBa0Q7UUFGM0QsWUFJRSxrQkFBTSxPQUFPLENBQUMsU0FHZjtRQUxRLGNBQVEsR0FBUixRQUFRLENBQTBDO1FBR3pELEtBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0QsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7SUFDL0QsQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQWJELENBQWtELEtBQUssR0FhdEQ7QUFiWSxvRUFBNEI7QUFlekM7SUFJRSx5QkFBWSxPQUFnQztRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxlQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFZRCwrQkFBSyxHQUFMO1FBRUUsSUFBTSxRQUFRLEdBQXdCLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFNLE9BQU8sR0FBaUUsQ0FDNUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNoRCxDQUFDO1FBRUYsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsTUFBTSxFQUFFLE9BQU8sSUFBSyxPQUEyQixDQUFDLE1BQU07U0FDdkQsQ0FBQyxDQUFDO1FBRUgsSUFBTSxjQUFjLEdBQXVCO1lBQ3pDLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtZQUN2QixHQUFHLEtBQUE7U0FDSixDQUFDO1FBRUYsSUFBSSxPQUFPLElBQUssT0FBeUIsQ0FBQyxJQUFJLEVBQUU7WUFDOUMsY0FBYyxDQUFDLElBQUksR0FBSSxPQUF5QixDQUFDLElBQUksQ0FBQztTQUN2RDtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2FBQ3RDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDUCxJQUFNLFFBQVEsR0FBNkY7Z0JBQ3pHLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDdEIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO2dCQUMxQixNQUFNLEVBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQjtnQkFDakMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7YUFDZixDQUFDO1lBRUYsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxFQUFFLFVBQUEsR0FBRztZQUNKLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFFekIsSUFBTSxRQUFRLEdBR1YsQ0FDQSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNKLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDdEIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO2dCQUMxQixNQUFNLEVBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQjtnQkFDakMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7YUFDZixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ2QsQ0FBQztZQUVKLElBQU0sS0FBSyxHQUFHLElBQUksNEJBQTRCLENBQzVDLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSSxHQUFNLEVBQ3pCLFFBQVEsQ0FDVCxDQUFDO1lBRUYsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEzRUQsSUEyRUM7QUEzRVksMENBQWUifQ==
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
var typed_tuple_1 = require("typed-tuple");
// TODO: Allow for full list of standard methods as well as custom methods
exports.HttpMethods = typed_tuple_1.default('GET', 'PUT', 'POST', 'PATCH', 'DELETE');
var UnsupportedHttpMethod = /** @class */ (function (_super) {
    __extends(UnsupportedHttpMethod, _super);
    function UnsupportedHttpMethod(method) {
        return _super.call(this, "Unsupported HTTP method: " + method) || this;
    }
    return UnsupportedHttpMethod;
}(Error));
exports.UnsupportedHttpMethod = UnsupportedHttpMethod;
function cleanseHttpMethod(method) {
    method = method.toUpperCase();
    if (!exports.HttpMethods.some(function (m) { return m === method; })) {
        throw new UnsupportedHttpMethod(method);
    }
    return method;
}
exports.cleanseHttpMethod = cleanseHttpMethod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFyZWQvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0M7QUFFaEMsMEVBQTBFO0FBRTdELFFBQUEsV0FBVyxHQUFHLHFCQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBSTFFO0lBQTJDLHlDQUFLO0lBQzlDLCtCQUFZLE1BQWM7ZUFDeEIsa0JBQU0sOEJBQTZCLE1BQVMsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMkMsS0FBSyxHQUkvQztBQUpZLHNEQUFxQjtBQU1sQyxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsSUFBSSxDQUFDLG1CQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLE1BQU0sRUFBWixDQUFZLENBQUMsRUFBRTtRQUN4QyxNQUFNLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDekM7SUFDRCxPQUFPLE1BQW9CLENBQUM7QUFDOUIsQ0FBQztBQU5ELDhDQU1DIn0=